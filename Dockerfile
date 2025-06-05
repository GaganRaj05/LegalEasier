FROM python:3.11-slim
WORKDIR /app
# Copy only the fastapi-backend files
COPY fastapi-backend/requirements.txt .
COPY fastapi-backend/app ./app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]