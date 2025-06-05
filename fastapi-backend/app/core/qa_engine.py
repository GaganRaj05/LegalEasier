from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from fastapi import HTTPException
from app.core.config import GROQ_API_KEY
from langchain.chains import RetrievalQA, LLMChain
from typing import List
import os
import json as std_json
import asyncio

embeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')

MAIN_PROMPT_TEMPLATE = """You are a helpful legal assistant AI named Lawgic.

Your job is to assist users with legal questions by using the provided CONTEXT. If the context does not contain enough information, first answer the question based on your general knowledge of American law. Then, if applicable, mention the price of the legal document preparation as per the CONTEXT.

Do not help users write legal documents. Only inform them about what documents may be required and how much they might cost.

Only respond to legal questions. If the user's query is not related to law or legal documents, respond with:  
"I'm here to assist you with legal questions only. Please ask a legal query."

Do NOT fabricate or guess legal facts. If you're unsure, respond with:  
"I'm not sure from the context, but here's what I know generally," followed by a brief, helpful legal explanation.

CONTEXT:
{context}

QUESTION: {question}

Helpful Answer:
"""


URGENCY_PROMPT_TEMPLATE = """
You're a helpful legal AI assistant. Your job is to determine how legally urgent each user's situation is.

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


qa_chain = None

async def initialize_components():
    global vectorstore, qa_chain
    
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

urgency_prompt = PromptTemplate(
    input_variables=["formatted_data"],  
    template=URGENCY_PROMPT_TEMPLATE,
)

urgency_chain = LLMChain(
    llm=llm,
    prompt=urgency_prompt
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

        prompt_input = {"formatted_data": formatted_data}

        response = await urgency_chain.ainvoke(prompt_input)

        try:
            urgency_result = std_json.loads(response["text"])
        except Exception as parse_err:
            print("Failed to parse model response:", response["text"])
            raise ValueError("LLM response was not valid JSON.")

        return urgency_result

    except Exception as e:
        print(f"Urgency detection error: {e}")
        raise HTTPException(status_code=500, detail="Failed to determine urgency.")

asyncio.create_task(initialize_components())