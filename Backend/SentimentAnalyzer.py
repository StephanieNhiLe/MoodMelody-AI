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

    def get_music_prompt(self, sentiment, custom_settings = None): 
        # prompt = f"Generate a detailed music text prompt for a {sentiment} sentiment. Include specific musical elements, instruments, and mood descriptions."
        base_prompt = f"Generate a detailed music text prompt for a {sentiment} sentiment."
        
        if custom_settings:
            base_prompt += " Include the following custom elements:"
            if custom_settings.get('customPrompt'):
                base_prompt += f"\nCustom description: {custom_settings['customPrompt']}"
            if custom_settings.get('emotionValue'):
                base_prompt += f"\nEmotion intensity: {custom_settings['emotionValue']}/100"
            if custom_settings.get('selectedMood'):
                base_prompt += f"\nSpecific mood: {custom_settings['selectedMood']}"
            if custom_settings.get('selectedMusicalElement'):
                base_prompt += f"\nFocus on this musical element: {custom_settings['selectedMusicalElement']}"
            if custom_settings.get('selectedInstrument'):
                base_prompt += f"\nFeature this instrument: {custom_settings['selectedInstrument']}"
        
        base_prompt += "\nInclude specific musical elements, instruments, and mood descriptions."
        response = model.generate_content(base_prompt)
        return response.text
    
