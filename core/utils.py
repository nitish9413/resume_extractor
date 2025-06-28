from pathlib import Path
import uuid
import shutil
from fastapi import UploadFile, HTTPException

ALLOWED_EXTENSIONS = {".pdf", ".txt", ".jpg", ".png", ".csv"}


def validate_file_type(filename: str) -> bool:
    if filename.endswith((".pdf")):
        return True
    return False


def is_allowed_file(filename) -> bool:
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS


def get_unique_file_name(filename) -> str:
    ext = Path(filename).suffix
    return f"{uuid.uuid4().hex}{ext}"


def save_file(file: UploadFile) -> Path:
    UPLOAD_DIR = Path("./data")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    file_name = get_unique_file_name(
        file.filename
    )  # file_name or f"{uuid4().hex}{Path(file.filename).suffix}"
    file_path = UPLOAD_DIR / file_name

    try:
        with open(file_path, "wb") as out_file:
            shutil.copyfileobj(file.file, out_file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    return file_path
