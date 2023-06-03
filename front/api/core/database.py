import json
from typing import Optional, List
from dotenv import load_dotenv

load_dotenv()
import os

from sqlmodel import SQLModel, Column, Field, create_engine, Session, select, String

from models.nodes import NodePayload

engine = create_engine(
    f"mysql+mysqlconnector://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_DATABASE')}")
SQLModel.metadata.create_all(engine)


class ApiSchema(SQLModel, table=True):
    __tablename__ = 'ApiSchema'
    id: Optional[int] = Field(default=None, primary_key=True)
    projectId: int
    schema_: Optional[str] = Field(sa_column=Column("schema", String, default=None))


class Account(SQLModel, table=True, schema="Account"):
    id: int = Field(primary_key=True)
    name: str


def get_project_schema(project_id: str) -> List[List[NodePayload]]:
    with Session(engine) as session:
        statement = select(ApiSchema).where(ApiSchema.projectId == project_id)
        response = session.exec(statement).first()
        return json.loads(response.schema_)
