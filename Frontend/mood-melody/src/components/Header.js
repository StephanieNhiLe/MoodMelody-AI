import React, { useState } from 'react';
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // For the upload button icon
import VideoLabelIcon from '@mui/icons-material/VideoLabel'; // Icon for the video URL button

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: 20, // Rounded corners
  overflow: 'hidden', // Ensures the child elements do not overflow the rounded corners
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: 'none',
    flex: 1,
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
    },
    '&:not(.Mui-selected)': {
      backgroundColor: 'transparent',
      color: 'grey',
    },
  },
}));

const VideoPlaceholder = styled(Paper)(({ theme }) => ({
  height: 300,
  flex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid white',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
    paddingRight: '36px', // Padding for the tab button
  },
});

const TabButton = styled(IconButton)({
  position: 'absolute',
  right: 10,
  top: 'calc(50% - 14px)', // Center vertically
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '4px',
});

const CreateMusicPage = () => {
  const [uploadType, setUploadType] = useState('upload');
  const [videoUrl, setVideoUrl] = useState('');

  const handleUploadChange = (event, newUploadType) => {
    if (newUploadType !== null) {
      setUploadType(newUploadType);
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
      <Typography variant="h3" sx={{ mt: 8, mb: 2, background: 'linear-gradient(45deg, green, white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Create Your Music
      </Typography>
      <Box sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', px: 2 }}>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', pr: 2, position: 'relative' }}>
          <StyledToggleButtonGroup
            exclusive
            onChange={handleUploadChange}
            aria-label="Video upload choice"
            fullWidth
          >
            <ToggleButton value="upload" startIcon={<CloudUploadIcon />}>Upload video</ToggleButton>
            <ToggleButton value="url" startIcon={<VideoLabelIcon />}>Paste a video URL</ToggleButton>
          </StyledToggleButtonGroup>
          <StyledTextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder='Type your word here...'
            InputProps={{
              endAdornment: (
                <TabButton size="small">
                  tab
                </TabButton>
              ),
            }}
          />
          <Button variant="contained" color="secondary" sx={{ alignSelf: 'start', mt: 2, borderRadius: 20 }}>
            Generate Video
          </Button>
        </Box>
        <VideoPlaceholder>
          Generated Video Appears Here
        </VideoPlaceholder>
      </Box>
    </Box>
  );
};

export default CreateMusicPage;
