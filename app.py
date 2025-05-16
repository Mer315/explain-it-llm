from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openai
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

tones = {
    "ELI5": "Explain this like I'm five years old.",
    "Formal": "Explain this formally and professionally.",
    "Code-heavy": "Explain this with code examples.",
    "Gen Alpha Brain Rot": "Explain this using Gen Alpha slang and brain rot style.",
    "Floptropica": "Explain this in Floptropican style and help flops slay the exam."
}

@app.post("/explain")
async def explain(request: Request):
    data = await request.json()
    prompt = data["prompt"]
    tone = data["tone"]
    full_prompt = f"{tones[tone]} Topic: {prompt}"

    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": full_prompt}],
            temperature=0.7,
            max_tokens=400
        )
        return {"explanation": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
