import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/Hero-Image2.png'; // Update path if necessary

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGenerateVideoClick = () => {
    navigate('/create-music');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"  // Changed from center to flex-start
      justifyContent="center"
      height="90vh"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'white',
        padding: '2% 7%',
      }}
    >
      <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold', mt: 8, mb: 2, background: 'linear-gradient(45deg, #849567, white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Where Creativity <br/> Meets Music
      </Typography>
      <Typography variant="h5" gutterBottom sx={{mt: 3, fontSize: 23 }}>
        AI-Powered Video Synthesis at Your Fingertips
      </Typography>
      <Button
        variant="contained"
        sx={{
        backgroundColor: '#A1C75E',
        padding: '1% 1.5%',
        fontSize: '1em',
        borderRadius: '3rem',
        '&:hover': {
        backgroundColor: '#85B038'
        },
        mt: 4
        }}
        onClick={handleGenerateVideoClick}
      >
        Generate Video
      </Button>
    </Box>
  );
};

export default HeroSection;
