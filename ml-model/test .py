import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# IMPORTANT: point to folder, not model file
model_path = "./"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)

model.eval()

label_map = model.config.id2label

def predict(text):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = torch.softmax(logits, dim=1)
        predicted_class = torch.argmax(probabilities, dim=1).item()

    confidence = probabilities[0][predicted_class].item()

    return label_map[predicted_class], confidence


while True:
    text = input("\nEnter text (or type 'exit'): ")

    if text.lower() == "exit":
        break

    label, confidence = predict(text)

    print(f"\nPredicted Category: {label}")
    print(f"Confidence: {confidence:.4f}")
