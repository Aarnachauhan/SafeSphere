import os
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "aarnachauhan/cyberbullying-detection-model"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)
model.eval()

class TextInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"status": "ML server running"}

@app.post("/predict")
def predict(input: TextInput):

    inputs = tokenizer(
        input.text,
        return_tensors="pt",
        truncation=True,
        padding=True
    )

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)

        prediction_index = torch.argmax(probs, dim=1).item()
        confidence = probs[0][prediction_index].item()

    label = model.config.id2label[prediction_index]

    return {
        "label": label,
        "confidence": round(float(confidence), 4)
    }