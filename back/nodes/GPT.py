from typing import Dict, Union

from langchain.prompts import (SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate)
from langchain.chat_models import ChatOpenAI
from pydantic import BaseModel

NodeVariables = Dict[str, str]


class GPTAvailableConfig(BaseModel):
    template: str = None
    prompt: str = None
    system_input_variables: NodeVariables = None
    human_input_variables: NodeVariables = None
    temperature: float = 0.5,
    model_name: str = "gpt-3.5-turbo",
    max_tokens: int = None,


class ChatGPT:
    def __init__(
            self,
            template: Union[str, None] = None,
            prompt: str = None,
            system_input_variables: NodeVariables = None,
            human_input_variables: NodeVariables = None,
            temperature: float = 0.5,
            model_name: str = "gpt-3.5-turbo",
            max_tokens: int = None,
    ):
        self.max_tokens = max_tokens
        self.system_template = None
        self.template = []
        if template is not None:
            self.system_template = SystemMessagePromptTemplate.from_template(template)
            self.template.append(self.system_template)
        if prompt is not None:
            self.human_template = HumanMessagePromptTemplate.from_template(prompt)
            self.template.append(self.human_template)
        self.system_input_variables = system_input_variables
        self.human_input_variables = human_input_variables
        self.temperature = temperature
        self.system_input_keys = list(system_input_variables.keys()) if system_input_variables is not None else []
        self.human_input_keys = list(human_input_variables.keys()) if human_input_variables is not None else []
        self.prompt = ChatPromptTemplate.from_messages(self.template if self.template is not None else [], )
        self.chat = ChatOpenAI(temperature=temperature, model_name=model_name, max_tokens=self.max_tokens)

    def call(self):
        variables = {}
        variables.update(self.system_input_variables or {})
        variables.update(self.human_input_variables or {})
        messages = self.prompt.format_prompt(**variables).to_messages()
        response = self.chat(messages)
        return response.content
