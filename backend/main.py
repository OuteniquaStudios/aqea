from fastapi import FastAPI, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
from test_case_generator import TestCaseGenerator
import asyncio
from sse_starlette.sse import EventSourceResponse

app = FastAPI()

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,

    # Vite's default port is 5173
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerationStatus:
    def __init__(self):
        self.current_ticket = 0
        self.total_tickets = 0
        self.current_status = "idle"
        self.results = []

status = GenerationStatus()

@app.post("/upload")
async def upload_file(file: UploadFile):
    try:
        content = await file.read()
        tickets = json.loads(content)
        return {"tickets": tickets}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/generate")
async def generate_test_cases(request: Request):
    try:
        data = await request.json()
        tickets = data['tickets']
        prompt_path = data['prompt_path']
        model = data['model']
        temperature = data['temperature']

        generator = TestCaseGenerator(prompt_path, model, temperature)
        results = []

        for ticket in tickets:
            test_cases = generator.generate_test_cases(ticket)
            results.append({
                "ticket_key": ticket['key'],
                "ticket_summary": ticket['summary'],
                "test_cases": test_cases
            })

        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/status")
async def get_status():
    return {
        "current": status.current_ticket,
        "total": status.total_tickets,
        "status": status.current_status
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)