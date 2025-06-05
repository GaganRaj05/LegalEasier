FROM python:3.11-slim as builder

WORKDIR /app

# Install only build dependencies first
COPY fastapi-backend/requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Final lightweight stage
FROM python:3.11-slim

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /root/.local /root/.local
COPY fastapi-backend/app ./app

# Ensure scripts in .local are usable
ENV PATH=/root/.local/bin:$PATH

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]