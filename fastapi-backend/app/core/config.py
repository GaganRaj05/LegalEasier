from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
DB_URL = os.getenv('DB_URL')
SSL_PATH = os.getenv('SSL_PATH')
PORT = os.getenv('PORT')
