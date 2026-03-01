## SafeSphere

Developed a full-stack intelligent moderation system that detects cyberbullying in comments using NLP-based sentiment analysis, toxicity classification, and contextual intent detection. Integrated real-time comment monitoring, multi-class severity categorization (harassment, hate speech, threats), and automated alert mechanisms. Designed a scalable backend with secure authentication and deployed a responsive frontend for real-time feedback.
Integrated a behavior-aware Cool-Down feature that temporarily restricts users from posting when repeated toxic behavior is detected, reducing escalation and promoting healthier interactions

---

## tech stack

🛠 Tech Stack
🔹 1️⃣ Frontend

React.js
HTML5 & CSS3 
Axios

🔹 2️⃣ Backend

Node.js 
Express.js
JWT Authentication
MongoDB 

🔹 3️⃣ AI / Machine Learning
Python 
NLTK 
Scikit-learn 
Transformers (BERT / DistilBERT)
TensorFlow 
PyTorch

## moderation workflow

1. user submits a reply
2. backend sends reply text to fastapi ml server
3. ml server predicts one of 6 classes:
   - not_cyberbullying
   - gender
   - religion
   - ethnicity
   - age
   - other_cyberbullying
4. backend stores:
   - label
   - confidence score
   - isflagged (true if not_cyberbullying is not predicted)
5. flagged replies appear in admin dashboard
6. admin can hide or allow replies

only replies classified as cyberbullying are shown in the admin dashboard.

---

## architecture
the system requires four services running simultaneously:

| service   | port  |
|-----------|-------|
| frontend  | 3000  |
| backend   | 5000  |
| ml server | 8000  |
| database  | mongodb atlas |


## prerequisites

- node.js v18+
- npm
- python 3.9+
- mongodb atlas cluster (database user created and ip whitelisted)

---

## environment variables

create `server/.env`:

```bash
mongo_uri=your_mongodb_connection_string
port=5000
```

## setup
for backend clone the repo , install and start backend

```bash
cd server
npm install
npm run dev
```

for ml server ( install dependencies manually)
## 🤖 ML Model

The trained cyberbullying detection model is hosted on Hugging Face:

🔗 https://huggingface.co/aarnachauhan/cyberbullying-detection-model


```bash
cd (ml model folder)
python -m venv venv
pip install -r requirements.txt 
uvicorn app:app --reload --port 8000
```
activate environment
```bash
venv\scripts\activate
```

install dependencies and run server
```bash
pip install -r requirements.txt
uvicorn ml_server:app --reload --port 8000
```

install and start frontend
```bash
cd client
npm install
npm run dev
```
