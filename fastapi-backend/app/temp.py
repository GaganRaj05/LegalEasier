from sentence_transformers import SentenceTransformer
import os

# Create models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# Download and save the model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
model.save("models/all-MiniLM-L6-v2")
print("Model downloaded and saved locally")