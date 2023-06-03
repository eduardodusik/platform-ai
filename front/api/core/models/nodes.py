from typing import List, Union, Dict
from pydantic import BaseModel


class NodePayload:
    type: str = None
    values: List[Dict[str, Union[str, None, int]]] = None


class ProjectPayload(BaseModel):
    projectId: str
    # nodes: List[List[NodePayload]] = None
