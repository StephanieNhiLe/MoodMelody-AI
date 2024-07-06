import React from 'react';
import { Box, Grid } from '@mui/material';
import MusicCard from './MusicCard';
import cardImage1 from '../assets/Music-Card1.png';
import cardImage2 from '../assets/Music-Card2.png';
import cardImage3 from '../assets/Music-Card3.png';

const MusicSection = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="40px 20px"
      style={{ backgroundColor: '#000', color: 'white' }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <MusicCard
            image={cardImage1}
            title="Discover the music"
            description="Find your new favorite music"
          />
        </Grid>
        <Grid item>
          <MusicCard
            image={cardImage2}
            title="Discover the music"
            description="Find your new favorite music"
          />
        </Grid>
        <Grid item>
          <MusicCard
            image={cardImage3}
            title="Discover the music"
            description="Find your new favorite music"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MusicSection;
