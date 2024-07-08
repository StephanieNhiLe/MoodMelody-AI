from transformers import pipeline
import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

# Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

class SentimentAnalyzer:
    def __init__(self):
        self.analyzer = pipeline('sentiment-analysis')
        
    def analyze_sentiment_from_file(self, file_path):
        with open(file_path, 'r') as file:
            text = file.read()
        result = self.analyzer(text[:512])[0] 
        sentiment = result['label'].lower()
        score = result['score']
        return sentiment, score

    def get_music_prompt(self, sentiment): 
        prompt = f"Generate a detailed music text prompt for a {sentiment} sentiment. Include specific musical elements, instruments, and mood descriptions."
        response = model.generate_content(prompt)
        return response.text
    
