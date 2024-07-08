import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VideoPlaceholder = styled(Paper)(({ theme, fit }) => ({
  width: fit === 'cover' ? '40%' : '90%', // Reduce width for portrait videos
  height: fit === 'cover' ? 600 : 300, // Increase height for portrait videos
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid white',
  margin: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}));

const GreyPlaceholder = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 300,
  backgroundColor: 'grey',
  margin: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    borderColor: 'white',
    color: 'white',
    '& fieldset': {
      borderColor: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  },
});

const StyledVideo = styled('video')(({ fit }) => ({
  width: '100%',
  height: '100%',
  objectFit: fit, // Use the fit prop to set object-fit
}));

const CreateMusicPage = () => {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [objectFit, setObjectFit] = useState('contain'); // Default object-fit
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(''); // State for the generated video URL
  const [sentimentResult, setSentimentResult] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(file);
      setPreviewUrl(url);

      const video = document.createElement('video');
      video.src = url;
      video.onloadedmetadata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        if (aspectRatio > 1) {
          setObjectFit('contain'); // Landscape
        } else {
          setObjectFit('cover'); // Portrait
        }
      };
    }
  };

  const handleGenerateVideo = async () => {
    if (!uploadedVideo) {
      return;
    }
  
    const formData = new FormData();
    formData.append('video', uploadedVideo);
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/getBGM', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'  
      });

      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      setGeneratedVideoUrl(videoUrl);
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  const handleDownloadVideo = () => {
    const link = document.createElement('a');
    link.href = generatedVideoUrl;
    link.download = 'generated_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSentimentAnalysis = async () => {
    if (!uploadedVideo) {
      alert('Please upload a video first');
      return;
    }
  
    const formData = new FormData();
    formData.append('video', uploadedVideo);
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze_sentiment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const result = response.data;
      alert(`Sentiment: ${result.sentiment}\nScore: ${result.score}`);
      setSentimentResult({ sentiment: result.sentiment, score: result.score });
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing sentiment');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0A1929',
        color: 'white',
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          mt: 2,
          mb: 2,
          background: 'linear-gradient(45deg, #849567, white)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'left',
          width: '100%',
          pl: 48,
        }}
      >
        Create Your Music
      </Typography>
      <Box sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', px: 2, paddingBottom: '50px' }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', pr: 2, alignItems: 'center', justifyContent: 'center' }}>
          <StyledTextField
            variant="outlined"
            type="file"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <VideoPlaceholder fit={objectFit}>
              <StyledVideo controls fit="contain">
                <source src={previewUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </StyledVideo>
            </VideoPlaceholder>
          ) : (
            <GreyPlaceholder sx={{borderRadius: 5}}>
              <Typography variant="h6">Video Preview</Typography>
            </GreyPlaceholder>
          )}
          {previewUrl && (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '10px' }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#9179a3', alignSelf: 'end', mt: 2, borderRadius: 20 }}
                onClick={handleSentimentAnalysis}
              >
                Mood Detection
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#A1C75E', alignSelf: 'end', mt: 2, borderRadius: 20 }}
                onClick={handleGenerateVideo}
              >
                Generate Video
              </Button>
            </div>
          )}
          {sentimentResult && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Sentiment Analysis Result</Typography>
              <Typography>Sentiment: {sentimentResult.sentiment}</Typography>
              <Typography>Score: {sentimentResult.score}</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', pl: 2, pt: 7}}>
        {generatedVideoUrl ? (
            <>
              {/* <video
                width="100%"
                height="300"
                controls
                src={generatedVideoUrl}
                style={{ borderRadius: '5px' }}
              >
                Your browser does not support the video tag.
              </video> */}
              <VideoPlaceholder fit={objectFit}>
                <StyledVideo controls fit={objectFit}>
                  <source src={generatedVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </StyledVideo>
              </VideoPlaceholder>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#A1C75E', alignSelf: 'end', mt: 6, borderRadius: 20 }}
                onClick={handleDownloadVideo}
              >
                Download Video
              </Button>
            </>
          ) : (
            <GreyPlaceholder sx={{ borderRadius: 5}}>
              <Typography variant="h6">Generated Video</Typography>
            </GreyPlaceholder>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMusicPage;
