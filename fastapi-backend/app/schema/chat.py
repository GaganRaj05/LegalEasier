from pydantic import BaseModel,Field
from datetime import datetime
from typing import List, Optional


class ChatSchema(BaseModel):
    message:str
    page_context:str  


class Message(BaseModel):
    user:str
    ai:str

class Lead(BaseModel):
    messages: List[Message]

