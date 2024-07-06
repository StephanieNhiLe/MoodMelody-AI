# Backend

## Setup

1. Navigate to Backend directory
```
cd Backend
```
2. Setup Virtual environment
```
python3 -m venv .venv
```
3. Acivate the Virtual environment
```
.\.venv\Scripts\activate
```
4. Install required packages and libraries
```
pip install -r requirements.txt
```
5. Rename .env_copy to .env, add your assemblyai API key (you can get it by signing up to https://www.assemblyai.com/) and add your hugging face token from https://huggingface.co/settings/tokens
6. Run server using,
```
python -m flask run
```
(or simply)
```
python app.py
```

## Routes

- ***/***: 
    - Server status check.
    - Returns, 200 if server is alive.

- ***/getBGM***:
    - Takes a video file from form-data with key `video`.
    - Returns the generated audio in a .wav format called `generated_music.wav`