import os
import uuid
import json

from dotenv import load_dotenv
load_dotenv()

def generate_json(data):
    suffix = str(uuid.uuid1())
    filename = f'payload_{suffix}.json'
    with open(filename, 'w') as fp:
        json.dump(data, fp)
    return filename


def upload_input_json(sm_session, filename):
    return sm_session.upload_data(
        filename,
        bucket=sm_session.default_bucket(),
        key_prefix='musicgen_large/input_payload',
        extra_args={"ContentType": "application/json"},
    )


def delete_file_on_disk(filename):
    if os.path.isfile(filename):
        os.remove(filename)


import urllib, time
from botocore.exceptions import ClientError
import random

def get_output(sm_session, output_location):
    output_url = urllib.parse.urlparse(output_location)
    
    # icons = ["🪘","🪇","🎷","🎸","🎺","🎻","🥁", "🪗", "🪕"]
    # print("generating music")
    while True:
        try:
            res = sm_session.read_s3_file(bucket=output_url.netloc, key_prefix=output_url.path[1:])
            # print("\nMusic is ready!🎉")
            return res
        except ClientError as e:
            if e.response["Error"]["Code"] == "NoSuchKey":
                
                # print(random.choice(icons), end = '')
                # time.sleep(2)
                continue
            raise
    

import botocore
import boto3
def download_from_s3(url):
    url_parts = url.split("/")
    bucket_name = url_parts[2]
    key = os.path.join(*url_parts[3:])
    filename = url_parts[-1]
    
    key = key.replace('\\', '/')
    
    # print(f'Bucket Name: {bucket_name}')
    # print(f'Key: {key}')
    # print(f'Filename: {filename}')
    
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    region_name = os.getenv('AWS_REGION_NAME')
    
    if not os.path.exists(filename):
        try:
            s3 = boto3.resource(
                    's3',
                    region_name=region_name,
                    aws_access_key_id=aws_access_key_id,
                    aws_secret_access_key=aws_secret_access_key
                )
            # print(f'Downloading {url} to {filename}')
            s3.Bucket(bucket_name).download_file(key, filename)
            return filename
        except botocore.exceptions.ClientError as e:
            print(f'Error: {e}')
            if e.response['Error']['Code'] == "404":
                print(f'The object {key} does not exist in bucket {bucket_name}')
            else:
                raise


# from IPython.display import Audio
# import IPython
# def play_output_audios(filenames, texts):
#     for filename, text in zip(filenames, texts):
#         # Create an Audio object
#         if not filename:
#             continue
#         audio = Audio(filename=filename)
#         # Display the audio
#         print(f"{text}:\n{filename}")
#         print()
#         display(audio)
#         print()