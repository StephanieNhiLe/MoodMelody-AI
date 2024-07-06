import React, { useState } from 'react';
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';  // For the upload button icon
import LinkIcon from '@mui/icons-material/Link';  // For the URL paste icon

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',  // Adding shadow for depth
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: 'none',
    flex: 1,
    borderTopLeftRadius: theme.shape.borderRadius,  // Only left button has left radius
    borderBottomLeftRadius: theme.shape.borderRadius,  // Only left button has left radius
    borderTopRightRadius: 0,  // Right button has no border radius on the left
    borderBottomRightRadius: 0,  // Right button has no border radius on the left
    '&:not(:first-of-type)': {
      borderTopLeftRadius: 0,  // Right button has no border radius on the left
      borderBottomLeftRadius: 0,  // Right button has no border radius on the left
      borderTopRightRadius: theme.shape.borderRadius,  // Only right button has right radius
      borderBottomRightRadius: theme.shape.borderRadius,  // Only right button has right radius
    },
    '&.Mui-selected': {
      backgroundColor: '#fff',  // Selected tab background
      color: '#000',  // Selected tab text color
      '& .MuiSvgIcon-root': {  // Icon color when selected
        fill: '#000',
      },
    },
    '&.MuiToggleButton-root': {
      color: '#fff',  // Default text & icon color
      '& .MuiSvgIcon-root': {  // Icon color by default
        fill: '#fff',
      },
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
    borderRadius: 20,  // Rounded corners
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
        bgcolor: '#0A1929',  // Dark bluish color
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
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', pr: 2 }}>
          <StyledToggleButtonGroup
            exclusive
            onChange={handleUploadChange}
            aria-label="Video upload choice"
            fullWidth
          >
            <ToggleButton value="upload" startIcon={<CloudUploadIcon />}>
              Upload video
            </ToggleButton>
            <ToggleButton value="url" startIcon={<LinkIcon />}>
              Paste a video URL
            </ToggleButton>
          </StyledToggleButtonGroup>
          {uploadType === 'upload' ? (
            <StyledTextField
              variant="outlined"
              type="file"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          ) : (
            <StyledTextField
              variant="outlined"
              fullWidth
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          )}
          <StyledTextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
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
