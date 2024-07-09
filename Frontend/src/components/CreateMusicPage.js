import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Slider, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VideoPlaceholder = styled(Paper)(({ theme, fit }) => ({ 
  width: '100%',
  maxWidth: '300px', 
  aspectRatio: '16 / 9', 
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid white',
  margin: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  overflow: 'hidden' 
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
  objectFit: 'contain',
}));

const CreateMusicPage = () => {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [objectFit, setObjectFit] = useState('contain'); 
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(''); 
  const [sentimentResult, setSentimentResult] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState('16 / 9');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(file);
      setPreviewUrl(url);

      const video = document.createElement('video');
      video.src = url;
      video.onloadedmetadata = () => {
        const aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
        setVideoAspectRatio(aspectRatio);
        // if (aspectRatio > 1) {
        //   setObjectFit('contain'); // Landscape
        // } else {
        //   setObjectFit('cover'); // Portrait
        // }
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

      
      const contentType = response.headers['content-type'];

      if (contentType && contentType.indexOf('application/json') !== -1) {
        console.log('Received JSON response (error)');
        const reader = new FileReader();
        reader.onload = function() {
          const errorMessage = JSON.parse(this.result);
          console.error('Server error:', errorMessage);
          alert(`Error: ${errorMessage.message}`);
        };
        reader.readAsText(response.data);
      } else {
        console.log('Received video blob');
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setGeneratedVideoUrl(videoUrl);
      }
    } catch (error) {
      console.error('Error generating video:', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        
        if (error.response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = function() {
            console.error('Error message from server:', this.result);
          };
          reader.readAsText(error.response.data);
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
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

  const renderSentimentResult = () => {
    if (!sentimentResult) return null;

    const { sentiment, score } = sentimentResult;
    const confidenceScore = parseFloat(score) * 100; 

    const getColor = (sentiment) => {
      switch (sentiment.toLowerCase()) {
        case 'positive': return '#48dbfb'; // Blue 
        case 'negative': return '#ff6b6b'; // Red 
        default: return '#feca57'; // Yellow 
      }
    };

    return (
      <Box sx={{width: '100%' }}>
        <Typography variant="h6" gutterBottom>Our Detector Shows That</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body1" sx={{ mr: 2, minWidth: 100 }}>Your Video Mood:</Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: getColor(sentiment),
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            {sentiment.toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>Confidence Level:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={confidenceScore} 
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColor(sentiment),
                  }
                }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>{`${Math.round(confidenceScore)}%`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
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
        <Box sx={{  display: 'flex', flexDirection: 'column', pr: 2, alignItems: 'center', justifyContent: 'center' }}>
          <StyledTextField
            variant="outlined"
            type="file"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
            <VideoPlaceholder sx={{ aspectRatio: videoAspectRatio }}>
              <StyledVideo controls >
                <source src={previewUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </StyledVideo>
            </VideoPlaceholder>
            {renderSentimentResult()}
            </div>
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
                Mood Detector
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
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2, pt: 7}}>
        {generatedVideoUrl ? (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}> 
              <VideoPlaceholder sx={{ aspectRatio: videoAspectRatio }}>
                <StyledVideo key={generatedVideoUrl} controls >
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
            </div>
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
