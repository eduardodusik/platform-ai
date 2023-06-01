from typing import List, Union, Dict
from pydantic import BaseModel


class NodePayload(BaseModel):
    type: str = None
    values: List[Dict[str, Union[str, None, int]]] = None


class ProjectPayload(BaseModel):
    nodes: List[List[NodePayload]] = None
