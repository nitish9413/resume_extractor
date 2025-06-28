from langchain_core.prompts.chat import ChatPromptTemplate


def get_prompt_template():
    prompt: ChatPromptTemplate = ChatPromptTemplate.from_template(
        """You are a resume parsing assistant. Extract the candidate's structured information from the resume text below.
        Return only structured data that fits the expected schema. If any section is missing, leave it empty.
    
        Resume:
        ------------------
        {resume_text}
        """
    )
    return prompt
