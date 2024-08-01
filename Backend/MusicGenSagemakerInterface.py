import sagemaker
import boto3
import sys, os
from inference_utils import generate_json, upload_input_json, delete_file_on_disk, get_output, download_from_s3
import json
import moviepy.editor as mp
from moviepy.audio.AudioClip import concatenate_audioclips
from moviepy.editor import VideoFileClip

from dotenv import load_dotenv
load_dotenv()

class MusicGenSagemakerInterface:
    def __init__(self):
        self.endpoint_name = os.getenv('SAGEMAKER_ENDPOINT_NAME')
        self.sagemaker_session_bucket = os.getenv('SAGEMAKER_SESSION_BUCKET')
        self.aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
        self.aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        self.region_name = os.getenv('AWS_REGION_NAME')
        
        self.boto3_session = boto3.session.Session(
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key,
            region_name=self.region_name
        )
        
        self.sm_session = sagemaker.Session(boto_session=self.boto3_session)
        sys.path.insert(0, os.path.abspath(".."))
        del sys.path[0]
        
        self.sagemaker_runtime = boto3.client(
            'sagemaker-runtime',
            region_name=self.region_name,
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key
        )
    
    def generate_music(self, input_text, temp_video_path):
        
        video_clip = VideoFileClip(temp_video_path)
        video_duration = video_clip.duration
        video_clip.close()
        max_new_tokens = int(video_duration * 50)
        
        generation_params = { 
                        'guidance_scale': 5, 
                        'max_new_tokens': 1260, 
                        'do_sample': True, 
                        'temperature': 0.9, 
                        'segment_duration': video_duration 
                    }
        data = {
            "texts": [input_text],
            "bucket_name": self.sagemaker_session_bucket,
            "generation_params": generation_params
        }
        filename = generate_json(data)
        input_s3_location = upload_input_json(self.sm_session, filename)
        delete_file_on_disk(filename)
        
        response = self.sagemaker_runtime.invoke_endpoint_async(
            EndpointName=self.endpoint_name,
            InputLocation=input_s3_location,
            ContentType="application/json",
            InvocationTimeoutSeconds=3600
        )
        
        output = get_output(self.sm_session, response.get('OutputLocation'))
        output = json.loads(output)
        
        music_files = []
        for s3_url in output.get('generated_outputs_s3'):
            if s3_url is not None:
                music_files.append(download_from_s3(s3_url))
        return music_files
        
    def add_background_music(self, video_path, audio_path):
        video_clip = mp.VideoFileClip(video_path)
        audio_clip = mp.AudioFileClip(audio_path)
        
        if audio_clip.duration < video_clip.duration:
            repeats = int(video_clip.duration / audio_clip.duration) + 1
            audio_clip = concatenate_audioclips([audio_clip] * repeats)
            
        altered_audio = audio_clip.subclip(0, video_clip.duration)
        
        # Adjust audio volume
        altered_audio = audio_clip.volumex(0.5)
        
        # Check if the video has an audio track
        if video_clip.audio is not None:
            new_audio = mp.CompositeAudioClip([video_clip.audio, altered_audio])
        else:
            new_audio = altered_audio
        
        final_clip = video_clip.set_audio(new_audio)
        output_path = "output.mp4"
        
        # Thread count should be equal to the number of CPU cores
        final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac', threads=4)
        
        # Clean up
        video_clip.close()
        audio_clip.close()
        
        return output_path