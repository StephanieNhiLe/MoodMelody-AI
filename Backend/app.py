from flask import Flask, jsonify, request, send_file
from VideoToTranscript import VideoToTranscript
from MusicGen import MusicGen
import io

app = Flask(__name__)

@app.route('/', methods=['GET'])
def check():
    return jsonify({'message': 'Hello World!'}), 200

# Get Video from POST request body
# Generate Transcript from Video
# Generate Sentiment from Transcript
# Generate Music from Sentiment
@app.route('/getBGM', methods=['POST'])
def getBGM():
    if 'video' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    video = request.files['video']
    
    # Generate Transcript from Video
    videoTranscripter = VideoToTranscript()
    transcript = videoTranscripter.getTranscript(video)
    
    # ToDo: Find sentiment of Transcript to generate music accordingly
    
    
    # Generate Music from Transcript
    audio_bytes = MusicGen().generate_music(transcript)
    
    # Return Music as wav file
    return send_file(
        io.BytesIO(audio_bytes),
        mimetype='audio/wav',
        as_attachment=True,
        download_name='generated_music.wav'
    ), 200

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