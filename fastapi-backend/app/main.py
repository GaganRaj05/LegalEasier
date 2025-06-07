from fastapi import FastAPI
from app.core.config import PORT
from app.routes import chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)


app.include_router(chat.router,prefix='/ai')

@app.get('/')
async def hello():
    return {"success":True, "message":"hello"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
