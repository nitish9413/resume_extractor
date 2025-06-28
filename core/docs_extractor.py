from langchain_core.documents.base import Document
from langchain_docling import DoclingLoader
from langchain_docling.loader import ExportType
from docling.chunking import HybridChunker

EMBED_MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2"
EXPORT_TYPE = ExportType.MARKDOWN


def get_document_loader(file_path) -> DoclingLoader:
    loader: DoclingLoader = DoclingLoader(
        file_path=file_path,
        export_type=EXPORT_TYPE,
        chunker=HybridChunker(tokenizer=EMBED_MODEL_ID),
    )
    return loader

async def get_extracted_document(file_path):
    loader = get_document_loader(file_path)

    docs: list[Document] = await loader.aload()
    return docs