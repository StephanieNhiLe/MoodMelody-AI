import assemblyai as aai
import os

from dotenv import load_dotenv
load_dotenv()

class VideoToTranscript:
    def __init__(self):
        aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
        self.transcriber = aai.Transcriber()
        
    def getTranscript(self, video):
        transcript = self.transcriber.transcribe(video)
        return transcript.text