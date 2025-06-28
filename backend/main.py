from pathlib import Path
import uuid

from fastapi import FastAPI, UploadFile, BackgroundTasks
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.documents.base import Document
from langchain_core.prompts.chat import ChatPromptTemplate
from pydantic import BaseModel
from core.docs_extractor import get_extracted_document
from core.llm_extractor import extract_structured_information
from core.inference import get_chat_inference
from core.prompt import get_prompt_template
from core.utils import is_allowed_file, save_file
from core.bg_task import tasks, bg_task

app: FastAPI = FastAPI()

origins = [
    "http://localhost:3000",  # Assuming your React app runs on port 3000
    "http://localhost:3001",
    "http://192.168.1.15:3000",
    # Add any other origins you need
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_server_status() -> JSONResponse:
    return JSONResponse(content={"message": "live!"})


@app.post("/resume_uploader")
async def upload_resume(
    file: UploadFile, background_tasks: BackgroundTasks
) -> JSONResponse:
    task_id = str(uuid.uuid4())
    if is_allowed_file(file.filename) is False:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    file_path: Path = save_file(file)
    tasks[task_id] = "processing"

    background_tasks.add_task(bg_task, file_path, task_id)

    return JSONResponse(
        content={"message": "File Upload Successful!", "task_id": task_id}
    )

@app.get("/resume-status/{task_id}")
async def get_resume_details(task_id):
    if task_id not in tasks:
        return JSONResponse(content="Not found")
    
    data = tasks[task_id]
    if isinstance(data,BaseModel):
        return JSONResponse(content="done")
    return data

@app.get("/resume_result/{task_id}")
async def get_resume_result(task_id):
    return tasks.get(task_id,{"error":"task not found"})