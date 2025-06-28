from core.inference import get_chat_inference
from core.llm_extractor import extract_structured_information
from core.prompt import get_prompt_template
from core.docs_extractor import get_extracted_document

tasks = {}

async def bg_task(file_path,task_id):
    docs = await get_extracted_document(file_path)
    # print(docs)

    prompt = get_prompt_template()

    llm = get_chat_inference()

    result = extract_structured_information(llm, prompt, docs)
    tasks[task_id] = result