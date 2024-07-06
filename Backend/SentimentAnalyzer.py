from transformers import pipeline

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
        keywords = {
            'positive': "uplifting beats and bright synths",
            'negative': "melancholic piano and dark ambient",
            'neutral': "ambient soundscapes and chill vibes"
        }
        return keywords.get(sentiment, "ambient soundscapes and chill vibes")
