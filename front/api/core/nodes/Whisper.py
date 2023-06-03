import os

import whisper

class WhisperNode:
    def __init__(self):
        pass

    def call(self):
        model = whisper.load_model("base")
        result = model.transcribe(os.path.join(os.path.dirname(__file__), "audio.mp3"), language="Portuguese", initial_prompt="Eduardo Dusik")
        # file = open(os.path.join(os.path.dirname(__file__), "audio.mp3"), "rb")
        # transcript = openai.Audio.transcribe("whisper-1", file, prompt="Meu nome é Eduardo Dusik")
        return result
