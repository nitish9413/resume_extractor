from core.resume_llm_schema import ResumeSchema
from langchain.output_parsers import PydanticOutputParser


def extract_structured_information(llm, prompt, docs):
    chain = prompt | llm
    result = chain.invoke({"resume_text": docs})
    return result
