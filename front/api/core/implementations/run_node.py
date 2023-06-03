import re
from collections import namedtuple
from typing import Dict, List
import re

from models.nodes import NodePayload, ProjectPayload
from nodes.GPT import ChatGPT


def find_value_by_key(key_to_find: str, payload: NodePayload):
    for item in payload.values:
        if key_to_find in item:
            return item[key_to_find]
    return None


def get_placeholder_names(string):
    pattern = r"\{([^}]+)\}"
    matches = re.findall(pattern, string)
    return matches


def create_variables_dict(matches, project_variables):
    variables_dict = {}
    for match in matches:
        if match in project_variables:
            variables_dict[match] = project_variables[match]
        else:
            variables_dict[match] = ""
    return variables_dict


def run_node_gpt(node: NodePayload, project_variables: Dict[str, str]):
    human_variables = get_placeholder_names(find_value_by_key("Prompt", node))
    system_variables = get_placeholder_names(find_value_by_key("system", node))

    gpt_response = ChatGPT(
        model_name=(find_value_by_key("Model", node)).lower(),
        prompt=find_value_by_key("Prompt", node),
        template=find_value_by_key("system", node),
        system_input_variables=create_variables_dict(system_variables, project_variables),
        human_input_variables=create_variables_dict(human_variables, project_variables),
        temperature=find_value_by_key("Temperature", node),
        max_tokens=find_value_by_key("max-tokens", node),
    ).call()
    return gpt_response


NodeRunners = {
    "GPT_OPEN_AI": run_node_gpt
}


def run_project_imp(items: List[List[NodePayload]]):
    project_variables: Dict[str, str] = {}
    for item in items:
        for node in item:
            Node = namedtuple('Node', node.keys())
            node = Node(**node)
            runner = NodeRunners.get(node.type.upper(), None)
            if runner is not None:
                var_name = find_value_by_key("env", node)
                res = runner(node, project_variables)
                project_variables[var_name] = res

    return {"response": project_variables}
