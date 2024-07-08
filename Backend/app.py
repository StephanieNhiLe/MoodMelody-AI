from flask import Flask, jsonify, request, send_file
from VideoToTranscript import VideoToTranscript
from MusicGen import MusicGen
from SentimentAnalyzer import SentimentAnalyzer
import io  
import os
from datetime import datetime
import os

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
    try:
        if 'video' not in request.files:
            return jsonify({'message': 'No file part'}), 400
        video = request.files['video']
        
        temp_video_path = generate_unique_filename('video', 'mp4')
        with open(temp_video_path, 'wb') as f:
            f.write(video.read())
        
        videoTranscripter = VideoToTranscript()
        transcript = videoTranscripter.getTranscript(temp_video_path)

        transcript_filename = generate_unique_filename('transcript', 'txt')
        transcript_path = os.path.join(TRANSCRIPTS_FOLDER, transcript_filename)
        with open(transcript_path, 'w') as f:
            f.write(transcript)
        
        sentimentAnalyzer = SentimentAnalyzer()
        sentiment, score = sentimentAnalyzer.analyze_sentiment_from_file(transcript_path)
        prompt = sentimentAnalyzer.get_music_prompt(sentiment)
        print(f"Sentiment: {sentiment}, Score: {score}, Prompt: {prompt}")

        musicGen = MusicGen()
        musicGen.generate_music(prompt) 
        outputVideo_path = musicGen.add_background_music(temp_video_path)
        
        removeTempFiles(temp_video_path, "musicgen_out.wav")
        
        return send_file(
            outputVideo_path,
            mimetype='video/mp4',
            as_attachment=True,
            download_name='output.mp4'
        )
    except Exception as e:
        app.logger.error(f"Error Processing Video: {str(e)}")
        return jsonify({'message': f'Error processing request: {str(e)}'}), 500

def generate_unique_filename(prefix, extension, sentiment_score=None):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    if sentiment_score:
        return f"{prefix}_{sentiment_score}_{timestamp}.{extension}"
    return f"{prefix}_{timestamp}.{extension}"

def removeTempFiles(temp_video_path, music_path):
    if os.path.exists(temp_video_path):
        os.remove(temp_video_path)
    if os.path.exists(music_path):
        os.remove(music_path)

if __name__ == '__main__':
    app.run()