from flask import Flask, jsonify, request, send_file
from VideoToTranscript import VideoToTranscript
from MusicGen import MusicGen
from SentimentAnalyzer import SentimentAnalyzer
import io  
import os
from datetime import datetime

app = Flask(__name__)

MUSIC_FOLDER = os.path.join(os.getcwd(), 'music')
TRANSCRIPTS_FOLDER = os.path.join(os.getcwd(), 'transcripts')
if not os.path.exists(MUSIC_FOLDER):
    os.makedirs(MUSIC_FOLDER)
if not os.path.exists(TRANSCRIPTS_FOLDER):
    os.makedirs(TRANSCRIPTS_FOLDER)

@app.route('/', methods=['GET'])
def check():
    return jsonify({'message': 'Hello World!'}), 200

@app.route('/getBGM', methods=['POST'])
def getBGM():
    """
    Processes a video request by performing the following steps:
    - Retrieves the video from the POST request body
    - Generates a transcript from the video
    - Generates sentiment analysis from the transcript
    - Generates music based on the sentiment analysis
    """
    try:
        # Check if video is in request
        if 'video' not in request.files:
            return jsonify({'message': 'No file part'}), 400
        video = request.files['video']
        
        # Generate Transcript from Video
        videoTranscripter = VideoToTranscript()
        transcript = videoTranscripter.getTranscript(video)

        # Save transcript to a txt file
        transcript_filename = generate_unique_filename('transcript', 'txt')
        transcript_path = os.path.join(TRANSCRIPTS_FOLDER, transcript_filename)
        with open(transcript_path, 'w') as f:
            f.write(transcript)
        
        # Perform sentiment analysis on the transcript txt file
        sentimentAnalyzer = SentimentAnalyzer()
        sentiment, score = sentimentAnalyzer.analyze_sentiment_from_file(transcript_path)
        prompt = sentimentAnalyzer.get_music_prompt(sentiment)
        print(f"Sentiment: {sentiment}, Score: {score}, Prompt: {prompt}") # Debugging

        # Generate Music from sentiment analysis
        audio_bytes = MusicGen().generate_music(prompt) 
    
        # Return Music as wav file
        return send_file(
            io.BytesIO(audio_bytes),
            mimetype='audio/wav',
            as_attachment=True,
            download_name='generated_music.wav'
        ), 200
    except Exception as e:
        app.logger.error(f"Error Processing Video: {str(e)}")
        return jsonify({'message': f'Error processing request: {str(e)}'}), 500

def generate_unique_filename(prefix, extension, sentiment_score=None):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    if sentiment_score:
        return f"{prefix}_{sentiment_score}_{timestamp}.{extension}"
    return f"{prefix}_{timestamp}.{extension}"

# Testing Purposes Only
# Get WAV from custom input
# `sentiment` = prompt to generate music
# @app.route('/genMusic', methods=['POST'])
# def genMusic():
#     if 'sentiment' not in request.json:
#         return jsonify({'message': 'No sentiment part'}), 400
#     sentiment = request.json['sentiment']
#     audio_bytes = MusicGen().generate_music(sentiment)
#     return send_file(
#         io.BytesIO(audio_bytes),
#         mimetype='audio/wav',
#         as_attachment=True,
#         download_name='generated_music.wav'
#     )




if __name__ == '__main__':
    app.run()