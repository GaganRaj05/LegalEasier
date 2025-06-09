from fastapi import APIRouter, HTTPException,Query
from fastapi.responses import JSONResponse
from app.schema.chat import ChatSchema, Lead
from app.core.qa_engine import answer_question, determine_urgency
from typing import List
router = APIRouter()

@router.post('/ask-legal')
async def answer_query(data: ChatSchema):
    try:
        answer = await answer_question(data.message, data.page_context)
        return {'answer':answer}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail={"success":False, "msg":"Some error occured please try again later"})


@router.post('/check-urgency')
async def process_leads(leads:List[Lead]):
    try:
        lead_data = [lead.dict() for lead in leads]
        result = await determine_urgency(lead_data)
        print(result)
        return {
            "success":True,
            "result":result
        }
    except Exception as e:
        raise HTTPException(status_code=501,detail={"success":False, "msg":"Some error occured please try again later"})