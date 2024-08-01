import numpy as np
from tqdm import tqdm
from moviepy.editor import VideoFileClip
from PIL import Image
import io
import os
import dotenv
import boto3
import json
from collections import defaultdict 

dotenv.load_dotenv()

class FaceEmotionPredictor:
    def __init__(self):
        self.endpoint_name = os.getenv("SAGEMAKER_FACE_ENDPOINT_NAME")
        self.aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
        self.aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        self.region_name = os.getenv('AWS_REGION_NAME')
        
        # Create a SageMaker runtime client
        self.sagemaker_runtime = boto3.client(
            'sagemaker-runtime',
            region_name=self.region_name,
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key
        )
    
    def predict_emotions(self, scene):
        skips = 20
        clip = VideoFileClip(scene)
        frame_count = int(clip.fps * clip.duration)
        
        all_class_probabilities = defaultdict(float)
        
        # Iterate through video frames
        for i in tqdm(range(0, frame_count, skips), desc="Processing frames"):
            frame = clip.get_frame(i / clip.fps)  # Get the frame directly
            
            # Convert frame to uint8
            frame = frame.astype(np.uint8)
            frame = Image.fromarray(frame)
            
            # Convert PIL image to bytes
            img_byte_arr = io.BytesIO()
            frame.save(img_byte_arr, format='PNG')
            img_byte_arr = img_byte_arr.getvalue()
            
            # Call the SageMaker endpoint
            response = self.sagemaker_runtime.invoke_endpoint(
                EndpointName=self.endpoint_name,
                Body=img_byte_arr,
                ContentType='image/x-image'
            )

            # Print the response
            result = response['Body'].read().decode('utf-8')            
            
            predictions = json.loads(result)

            # Sum the probabilities for each emotion across all frames
            for prediction in predictions:
                label = prediction['label']
                score = prediction['score']
                all_class_probabilities[label] += score

        # Sort emotions by their aggregated score and get the top 3
        sorted_emotions = sorted(all_class_probabilities.items(), key=lambda x: x[1], reverse=True)
        # top_emotion_labels = [emotion[0] for emotion in sorted_emotions[:3]]
        top_emotions = sorted_emotions[:3]
        clip.close()
        return top_emotions