import openai

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
    return {"message": "123"}


@app.post('/project')
async def run_project(items: ProjectPayload):
    return run_project_imp(items)

