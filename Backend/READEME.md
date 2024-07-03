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
5. Rename .env_copy to .env and add your assemblyai API key (you can get it by signing up to https://www.assemblyai.com/)
6. Run server using,
```
python -m flask run
```
(or simply)
```
python app.py
```