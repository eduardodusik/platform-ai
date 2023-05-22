import os
from typing import Union, Dict

import openai
from pydantic import BaseModel

from nodes.Whisper import WhisperNode
from nodes.GPT import ChatGPT, GPTAvailableConfig
from fastapi import FastAPI

app = FastAPI()

os.environ["OPENAI_API_KEY"] = "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"
openai.api_key = os.environ["OPENAI_API_KEY"]

def testGpt():
    template = "Voce é um especialista em {language} responda corretamente as questoes somente com o codigo, sem explicações:"
    human = "Responda a questao: {question}"
    test = ChatGPT(
        prompt=human,
        template=template,
        system_input_variables={"language": "javascript"},
        human_input_variables={"question": "fazer um lambda function"},
        temperature=0
    )
    print(test.call())


# def main():
#     testGpt()
#
#
# if __name__ == '__main__':
#     main()


# @app.get("/")
# async def read_root(template: str = None, prompt: str = None, system_input_variables: str = None,  human_input_variables: str  = None):
#     # template = "Voce é um especialista em {language} responda corretamente as questoes somente com o codigo, sem explicações:"
#     # human = "Responda a questao: {question}"
#     print(system_input_variables)
#     test = ChatGPT(
#         prompt=prompt,
#         template=template,
#         system_input_variables=system_input_variables.items(),
#         human_input_variables=human_input_variables.items(),
#         temperature=0
#     )
#     response = test.call()
#     return {"openAiResponse": response}
#
#

#

@app.get("/")
async def fun():
    return {"message": "fHello Worlddf"}

@app.post("/open-ai")
async def read_item(item: GPTAvailableConfig):
    test = ChatGPT(
        prompt=item.prompt,
        template=item.template,
        system_input_variables=item.system_input_variables,
        human_input_variables=item.human_input_variables,
        temperature=0
    )
    response = test.call()
    return {"openAiResponse": response}
    # return {"openAiResponse": item}



def main():
    # print('teste')
    # whisper = WhisperNode()
    # response = whisper.call()
    print("oibF")

main()