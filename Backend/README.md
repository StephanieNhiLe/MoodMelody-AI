# Setup Frontend (ReactJS)

1. Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) or [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Choose one of them) as main package manager

2. Install dependencies

```bash
npm install
```

3. Runs the app in the development mode.

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any logs, warnings, errors in the console.

Builds the app for production to the `build` folder.<br>

```bash
npm build
```

It bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

# Setup Backend (Flask)

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
    - Run `curl -X POST -F "video=¾assets/news-1.mp4" http://127.0.0.1:5000/getBGM --output generated_music.wav` to get the ouput