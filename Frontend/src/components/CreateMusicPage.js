import React, { useState } from 'react';
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';  // Importing the cloud upload icon

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: 'transparent',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(1),
    border: '1px solid white',
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
  margin: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,  // Rounded corners for the input
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

const TabButton = styled(IconButton)({
  position: 'absolute',
  right: 10,
  top: 'calc(50% - 14px)',  // Center vertically
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
            <ToggleButton value="url">
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
              placeholder="Paste a video URL"
            />
          )}
          <StyledTextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="Type your word here..."
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
