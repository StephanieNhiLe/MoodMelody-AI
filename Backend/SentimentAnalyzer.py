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
        # prompt = f"""Generate a detailed music text prompt for a composition that blends the following sentiments: {', '.join(sentiment)}. 

        #     Include:
        #     1. **Overall Mood and Emotional Journey:**
        #     - Describe the overall mood and how the music should transition between the different sentiments.
        #     - Specify the emotional journey the listener should experience.

        #     2. **Specific Musical Elements:**
        #     - **Tempo:** Indicate the tempo changes to match the different sentiments.
        #     - **Key:** Suggest key changes or modulations that reflect the emotional shifts.
        #     - **Time Signature:** Mention any changes in time signature that can enhance the emotional impact.

        #     3. **Instrumentation:**
        #     - List at least 3-4 instruments that should be used.
        #     - Describe how each instrument should be played to convey the different sentiments.

        #     4. **Song Structure:**
        #     - Outline the structure of the song (e.g., intro, verses, chorus, bridge).
        #     - Describe how each section should reflect the different sentiments.

        #     5. **Dynamic Changes and Transitions:**
        #     - Explain how the dynamics should change throughout the piece.
        #     - Describe transitions between different emotional states.

        #     6. **Specific Techniques or Effects:**
        #     - Mention any specific techniques or sound effects that should be used to enhance the emotional expression.

        #     Example:
        #     - **Mood and Emotional Journey:** Start with a melancholic and reflective mood, gradually building to a hopeful and uplifting climax, and ending with a serene and content resolution.
        #     - **Musical Elements:** Slow tempo in the beginning, transitioning to a faster tempo; minor key modulating to a major key; 4/4 time signature with occasional 3/4 sections.
        #     - **Instrumentation:** Piano with melancholic melodies, strings with soaring lines, acoustic guitar with warm strumming, and drums with energetic beats.
        #     - **Song Structure:** Intro (8 bars), Verse 1 (16 bars, melancholic), Chorus (16 bars, hopeful), Bridge (8 bars, reflective), Verse 2 (16 bars, building), Chorus (16 bars, uplifting), Outro (8 bars, serene).
        #     - **Dynamic Changes:** Start softly, build to a forte climax, and end softly.
        #     - **Techniques or Effects:** Use reverb on the piano for a reflective feel, crescendo on strings for emotional build-up, and bright synth effects in the chorus for an uplifting feel.

        #     Aim for a cohesive piece that represents the complexity of mixed emotions."""
        response = model.generate_content(prompt)
        return response.text
    
