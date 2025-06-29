from pathlib import Path
import uuid
from fastapi import APIRouter, BackgroundTasks, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from core.bg_task import bg_task, tasks
from core.utils import is_allowed_file, save_file

resume_router = APIRouter(prefix="/resume")


@resume_router.post("/resume_uploader")
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


@resume_router.get("/resume-status/{task_id}")
async def get_resume_details(task_id):
    if task_id not in tasks:
        return JSONResponse(content="Not found")

    data = tasks[task_id]
    if isinstance(data, BaseModel):
        return JSONResponse(content="done")
    return data


@resume_router.get("/resume_result/{task_id}")
async def get_resume_result(task_id):
    return tasks.get(task_id, {"error": "task not found"})
