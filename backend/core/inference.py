from core.resume_llm_schema import ResumeSchema
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def get_chat_inference(model_name="gemma2-9b-it"):
    llm: ChatGroq = ChatGroq(
        model_name=model_name, temperature=0.1, api_key=GROQ_API_KEY
    )
    structured_llm = llm.with_structured_output(ResumeSchema)

    return structured_llm
