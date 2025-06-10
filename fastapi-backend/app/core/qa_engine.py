from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings 
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate  
from langchain_groq import ChatGroq
from fastapi import HTTPException
from app.core.config import GROQ_API_KEY
from langchain.chains import RetrievalQA
from langchain_core.runnables import RunnablePassthrough  
from typing import List
import os
import json as std_json
import asyncio

embeddings = HuggingFaceEmbeddings(
    model_name="./models/all-MiniLM-L6-v2", 
    model_kwargs={'device': 'cpu'},
    encode_kwargs={'normalize_embeddings': True}
)
MAIN_PROMPT_TEMPLATE = """You are LawDog, the friendly legal assistant for LegalEasier.Respond based on the user's current page, Your primary goals are:
1. Provide accurate legal information about document preparation
2. Guide users toward scheduling a consultation when appropriate
3. Never provide actual legal advice (only general information)

**Page Context:** {page_context}
**User Question:** {question}
**Company Info:** {context}

**Rules for {page_context}:**
- Small Claims: Focus on forms, fees, and step-by-step process
- Divorce: Emphasize documents, timelines, and child custody
- Bankruptcy: Explain chapters, qualifications, and debt discharge
- Default: Offer general legal guidance

**Response Requirements:**
1. Match the tone/style of the {page_context} page
2. Include 1-2 key details from our services (fees, process, etc.)
3. End with a call-to-action (e.g., "Shall I help you start your small claims paperwork?")

**Example (Small Claims):**  
"The filing fee for small claims in Florida is $80. We can prepare your Statement of Claim for $175. Would you like to begin?"

**Always follow these rules:**
- Maintain a helpful, professional tone  ("Let me fetch that information for you")
- When explaining legal processes, mention that LegalEasier can help prepare the documents
- When the user asks about processes that require legal documents, conclude with a gentle prompt to schedule a meeting
- Never say "I don't know" - instead say "I'd recommend consulting with our team about that"

**Current Page Context:** {page_context}


**Relevant Context:** {context}

**Response Guidelines:**
1. Answer the legal question accurately but briefly
2. Mention document preparation service if relevant
3. Include ballpark pricing if available
4. End with a scheduling suggestion when appropriate

Example good response:
"The filing fee for divorce in California is typically $435. We can help prepare all your divorce documents for $199. Would you like to schedule a consultation to get started?"

Now answer this question:{question}

"""


SCHEDULING_PROMPT = """You're LawDog, the legal assistant for LegalEasier. The user has shown interest in {service_type}. 

Provide a friendly transition to scheduling that (Do not express the user has shown interest):
1. Mentions the benefit ("Our experts can prepare all your documents correctly")
2. Gives a clear call-to-action ("Please click the below button to schedule a consultation?")

Keep it under 2 sentences."""



URGENCY_PROMPT_TEMPLATE = """
You are a helpful legal assistant AI named LawDog. Always refer to yourself as LawDog . Your job is to determine how legally urgent each user's situation is.

Input: A list of user conversations. Each conversation contains messages from the user and the AI.

Instructions:
- Only look at the user's **first message** in each conversation.
- Label the urgency using one of these levels:
  - "Highly urgent"
  - "Moderate"
  - "Not urgent"

Examples of "Highly urgent":
- Divorce, eviction, domestic abuse, legal deadlines

Examples of "Moderate":
- Creating a will, power of attorney, property sale/purchase

Examples of "Not urgent":
- General legal curiosity, asking how law works, casual info

Return ONLY a JSON list, and nothing else.
Example format:
[
  {{ "urgency": "Highly urgent" }},
  {{ "urgency": "Moderate" }}
]

Here is the input data:
{formatted_data}
"""

vectorstore = None
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    temperature=0.3,
    model_name='llama3-70b-8192'
)

main_prompt = PromptTemplate(
    template=MAIN_PROMPT_TEMPLATE,
    input_variables=["context", "question","page_context"]
)
urgency_prompt = PromptTemplate(
    input_variables=["formatted_data"],  
    template=URGENCY_PROMPT_TEMPLATE,
)


qa_chain = None
urgency_chain = None

async def initialize_components():
    global vectorstore, qa_chain,urgency_chain
    
    if os.path.exists('legal-db'):
        print('Loading existing vector database')
        vectorstore = FAISS.load_local('legal-db', embeddings, allow_dangerous_deserialization=True)
    else:
        print('Creating new vector database')
        loader = PyPDFLoader('app/data/LegalEasierInfo.pdf')
        docs = loader.load()
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=200)
        chunks = splitter.split_documents(docs)
        vectorstore = FAISS.from_documents(chunks, embeddings)
        vectorstore.save_local('legal-db')
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        chain_type='stuff',
        return_source_documents=True,
        chain_type_kwargs={"prompt": main_prompt}
    )

    urgency_chain = (
        RunnablePassthrough() | 
        urgency_prompt | 
        llm
    )

async def answer_question(query: str, page_context: str = "general"):
    try:
        relevant_docs = await vectorstore.as_retriever().aget_relevant_documents(query)
        context_text = "\n\n".join(doc.page_content for doc in relevant_docs)

        prompt = PromptTemplate(
            template=MAIN_PROMPT_TEMPLATE,
            input_variables=["context", "question", "page_context"]
        ).format(
            context=context_text,
            question=query,
            page_context=page_context
        )

        response = await llm.ainvoke(prompt)
        answer_text = response.content.strip()

        should_schedule = any(keyword in answer_text.lower() for keyword in [
    "schedule a consultation",
    "book a consultation",
    "set up a consultation",
    "schedule a call",
    "speak with our team",
    "talk to an expert",
    "connect with a legal expert",
    "our team would be happy to guide you",
    "help you get started",
    "shall i help you schedule",
    "you can book a time",
    "get started with us",
    "our experts can assist",
    "we can walk you through",
    "would you like to schedule",
    "consult with our team",
    "ready to begin",
    "guide you through the process",
    "start your small claims paperwork"
])


        if should_schedule:
            schedule_msg = await llm.ainvoke(
                PromptTemplate(template=SCHEDULING_PROMPT, input_variables=["service_type"])
                .format(service_type=page_context)
            )
            answer_text += " " + schedule_msg.content

        return {
            "answer": answer_text,
            "suggest_schedule": should_schedule
        }

    except Exception as e:
        print("Error:", e)
        raise Exception("Failed to process legal query.")

async def determine_urgency(lead_data: List[dict]) -> List[dict]:
    try:
        formatted_data = std_json.dumps(lead_data, indent=2)
        response = await urgency_chain.ainvoke({"formatted_data": formatted_data})
        
        try:
            urgency_result = std_json.loads(response.content)
        except Exception as parse_err:
            print("Failed to parse model response:", response.content)
            raise ValueError("LLM response was not valid JSON.")

        return urgency_result
    except Exception as e:
        print(f"Urgency detection error: {e}")
        raise HTTPException(status_code=500, detail="Failed to determine urgency.")

asyncio.create_task(initialize_components())