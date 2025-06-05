# Stage 1: Install dependencies
FROM python:3.11-slim as builder

WORKDIR /app
COPY fastapi-backend/requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Minimal runtime image
FROM python:3.11-slim

WORKDIR /app

# Copy only installed Python packages
COPY --from=builder /root/.local /root/.local
COPY fastapi-backend/app ./app

# Make Python packages accessible
ENV PATH=/root/.local/bin:$PATH

# Optional: Download LLM at runtime instead of bundling it
# (See Step 2 below)

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]