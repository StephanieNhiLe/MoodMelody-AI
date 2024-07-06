import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '../assets/Hero-Image.png'; // Update path if necessary

const HeroSection = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        textAlign: 'center',
        color: 'white',
        padding: '0 20px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Where Creativity Meets Music
      </Typography>
      <Typography variant="h5" gutterBottom>
        AI-Powered Video Synthesis at Your Fingertips
      </Typography>
      <Button variant="contained" color="secondary" style={{ padding: '15px 30px', fontSize: '1.2em' }}>
        Generate Video
      </Button>
    </Box>
  );
};

export default HeroSection;