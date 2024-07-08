import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MusicCard from './MusicCard';
import cardImage1 from '../assets/Music-Card1.png';
import cardImage2 from '../assets/Music-Card2.png';
import cardImage3 from '../assets/Music-Card3.png';
import cardImage4 from '../assets/Music-Card4.png';

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
      <Typography variant="h2" gutterBottom sx={{ alignContent:'left', fontWeight: 'bold', mt: 8, mb: 2, background: 'linear-gradient(45deg, #849567, white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 5}}>
        How it Works
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2, mb: 6}}>
        <Grid item>
          <MusicCard
            image={cardImage1}
            title="1. Upload the Music"
            description="Click on the 'Upload' button and select your video file. "
          />
        </Grid>
        <Grid item>
          <MusicCard
            image={cardImage2}
            title="2. Analyze Video Mood"
            description="Our AI analyzes the overall mood and tone of your video. "
          />
        </Grid>
        <Grid item>
          <MusicCard
            image={cardImage3}
            title="3. Synthesize Background Music"
            description="AI will compose a custom mood-based background track for you."
          />
        </Grid>
        <Grid item>
          <MusicCard
            image={cardImage4}
            title="4. Amplify the Video with Music"
            description="Our AI music is auto-magically applied to your video."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MusicSection;
