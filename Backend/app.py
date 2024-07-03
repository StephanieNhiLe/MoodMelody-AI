from flask import Flask, jsonify, request
from VideoToTranscript import VideoToTranscript

app = Flask(__name__)

@app.route('/', methods=['GET'])
def check():
    return jsonify({'message': 'Hello World!'}), 200

# Get Video from POST request body
@app.route('/getBGM', methods=['POST'])
def getBGM():
    if 'video' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    video = request.files['video']
    videoTranscripter = VideoToTranscript()
    transcript = videoTranscripter.getTranscript(video)
    return jsonify({'transcript': transcript}), 200

if __name__ == '__main__':
    app.run()