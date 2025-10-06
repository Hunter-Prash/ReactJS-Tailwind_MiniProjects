from fastapi import FastAPI
from pydantic import BaseModel
import google.genai as genai
from google.genai import types
from dotenv import load_dotenv
import uvicorn
import os
from pathlib import Path
import spacy

load_dotenv(dotenv_path=r'D:\Frontend Projects\ReactJS-Tailwind_MiniProjects\Cleardesk_AI\Credentials\DynamoDB.env')

api_key=os.getenv('GEMINI_API_KEY')

if not api_key:
    raise ValueError('GEMINI_API_KEY not found in environment variables or .env file.')

client=genai.Client(api_key=api_key)
nlp = spacy.load("en_core_web_sm")

# Create a persistent chat session
chat = client.chats.create(
    model='gemini-2.5-flash',
    config=types.GenerateContentConfig(
        system_instruction="""
You are an AI assistant that analyzes customer support tickets.
For every ticket, generate a JSON object with exactly the following structure:

{
  "id": <integer>,
  "title": "<string>",
  "summary": "<string>",
  "classification": {
      "priority": "<High|Medium|Low>",
      "category": "<Bug|Feature|Query>"
  },
  "metadata": {
      "status": "<string>",
      "createdAt": "<ISO8601 timestamp>",
      "assignedTo": "<string>"
  },
  "sentiment": "<positive|neutral|negative|angry|frustrated>",
}

Instructions:
1. Only output valid JSON. Do not include explanations or extra text.
2. Base summary, sentiment, rootCause entirely on the ticket content.
3. Maintain original id, title, status, createdAt, and assignedTo.
4. Include all fields even if some are empty; do not omit any.
5. You will get tickets in batches of a particular size so respond to each ticket with the above structure
"""
    )
)


app=FastAPI()


# Define a model that matches the JSON payload
class TicketRequest(BaseModel):
    id: int
    title: str
    description: str
    status: str
    createdAt: str
    assignedTo: str
    
class ChatRequest(BaseModel):
    prompt:str


@app.get("/")
def root():
    return {"message": "HIIII from pyhton backend"}


@app.post("/nlp")
def handle_nlp(request: TicketRequest):
   
    def preprocess_text(text: str) -> str:
        doc = nlp(text.lower())
        tokens = []
        for token in doc:
            if not token.is_punct and not token.is_stop:
                tokens.append(token.lemma_)
        cleaned_text = " ".join(tokens)
        return cleaned_text

    def extract_keywords(text: str, top_n: int = 5) -> list:
        cleaned = preprocess_text(text)
        tokens = cleaned.split()

        # Count frequency
        freq = {}
        for i in tokens:
            freq[i] = freq.get(i, 0) + 1

        # Sort and take top_n
        sorted_tokens = sorted(freq.items(), key=lambda x: x[1], reverse=True)
        top_keywords = [k for k, v in sorted_tokens[:top_n]]
        return top_keywords

    # Use the functions on the input text
    cleaned = preprocess_text(request.description)
    keywords = extract_keywords(request.description)

    return {
        "cleaned": cleaned,
        "signals": keywords,
        "metadata":{
            "status":request.status,
            "createdAt": request.createdAt,
            "assignedTo": request.assignedTo
        }
    }

@app.post('/chat')
def handleChat(request:ChatRequest):
    full_reply = ""
    # Send the prompt from Node.js
    response_stream = chat.send_message_stream(request.prompt)

    # Concatenate streamed chunks
    for chunk in response_stream:
        full_reply += chunk.text

    return {"reply": full_reply.strip()}


# Run server if this script is executed directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8100, reload=True)