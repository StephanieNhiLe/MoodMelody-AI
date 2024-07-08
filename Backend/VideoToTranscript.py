import assemblyai as aai
import os

from dotenv import load_dotenv
load_dotenv()

class VideoToTranscript:
    def __init__(self):
        aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
        self.transcriber = aai.Transcriber()
        
    def getTranscript(self, videoPath):
        try:
            with open(videoPath, 'rb') as file:
                transcript = self.transcriber.transcribe(file)
                return transcript.text
        except Exception as e:
            raise Exception(f"Error transcribing video: {str(e)}")