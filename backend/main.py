
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api.resume import resume_router

app: FastAPI = FastAPI()

app.include_router(resume_router)

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