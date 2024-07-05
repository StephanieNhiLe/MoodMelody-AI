import requests
import os
from dotenv import load_dotenv
load_dotenv()

class MusicGen:
    def __init__(self):
        self.API_URL = "https://api-inference.huggingface.co/models/facebook/musicgen-small"
        self.headers = {"Authorization": "Bearer " + os.getenv('HUGGINGFACE_TOKEN')}
    
    def query(self, payload):
        response = requests.post(self.API_URL, headers=self.headers, json=payload)
        return response.content
    
    # Generate Music from Sentiment
    # inputs is the sentiment which will be used as prompt for the model
    def generate_music(self, inputs):
        audio_bytes = self.query({
            "inputs": inputs,
        })
        
        # with open("generated_music.wav", "wb") as f:
        #     f.write(audio_bytes)
        
        return audio_bytes