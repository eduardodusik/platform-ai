import openai

from database import get_project_schema
from implementations.run_node import run_project_imp
from models.nodes import ProjectPayload
from fastapi import FastAPI

from dotenv import load_dotenv

load_dotenv()
import os

app = FastAPI()

os.environ["OPENAI_API_KEY"] = os.getenv("openai_api_key")
openai.api_key = os.environ["OPENAI_API_KEY"]


@app.get("/")
async def fun():
    response = get_project_schema("clic9olyg0000tpfig15lbqi4")
    return {"response": response}


@app.post('/project')
async def run_project(items: ProjectPayload):
    project_schema = get_project_schema(items.projectId)
    return run_project_imp(project_schema)
