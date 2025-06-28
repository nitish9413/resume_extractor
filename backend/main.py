from pathlib import Path

from fastapi import FastAPI, UploadFile
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.documents.base import Document
from langchain_core.prompts.chat import ChatPromptTemplate

from core.docs_extractor import get_extracted_document
from core.llm_extractor import extract_structured_information
from core.inference import get_chat_inference
from core.prompt import get_prompt_template
from core.utils import is_allowed_file, save_file

app: FastAPI = FastAPI()

origins = [
    "http://localhost:3000",  # Assuming your React app runs on port 3000
    "http://localhost:3001",
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
async def upload_resume(file: UploadFile) -> JSONResponse:
    if is_allowed_file(file.filename) is False:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    file_path: Path = save_file(file)
    docs: list[Document] = await get_extracted_document(file_path)
    # print(docs)

    prompt: ChatPromptTemplate = get_prompt_template()

    llm = get_chat_inference()

    result = extract_structured_information(llm, prompt, docs)

    return result
