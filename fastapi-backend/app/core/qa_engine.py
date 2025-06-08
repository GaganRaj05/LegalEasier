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

embeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')

MAIN_PROMPT_TEMPLATE = """You are a helpful legal assistant AI named LawDog. Always refer to yourself as LawDog.
IMPORTANT: Your name is **LawDog** — always introduce yourself as LawDog and never use any other name like Lawgic, LawBot, etc.

Your role is to assist users with legal questions using the provided CONTEXT. When the context provides enough details, incorporate that information naturally into your response **without saying phrases like "according to the context", "based on the context", or anything that refers to the source of the data**.

If the context lacks sufficient information, answer based on your general knowledge of American law. If relevant, mention the price or availability of legal document preparation services using the information available.

Do not assist users in drafting legal documents. Your purpose is to inform users about what legal documents may be relevant to their situation and give general guidance on costs or processes.

Only respond to law-related queries. If the user's message is unrelated to legal matters, reply with:  
"I'm here to assist you with legal questions only. Please ask a legal query."

If you're unsure about a legal answer, do not guess. Instead, respond with:  
"I'm not sure from what I know, but here's what I know generally," followed by a helpful and brief legal explanation.

CONTEXT:
{context}

QUESTION: {question}

Helpful Answer:
"""

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
    input_variables=["context", "question"]
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

async def answer_question(query: str):
    try:
        answer_result = await qa_chain.ainvoke({'query': query})
        answer_text = answer_result['result'].strip()
        return {
            'answer': answer_text,
        }
    except Exception as e:
        print(f"Error: {e}")
        raise Exception("Failed to process legal query")

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