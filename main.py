from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/")
async def get_server_status():
    return JSONResponse(content={"message": "live!"})
