import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const MusicCard = ({ image, title, description }) => {
  return (
    <Card style={{ 
      backgroundColor: '#1e1e1e', color: 'white', 
      extAlign: 'center', width: '300px', 
      height: '400px', borderRadius: '1.5rem'
      }}>
      <CardMedia
        style={{ height: '200px' }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{fontSize:18, mt: 2}}>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom style={{color: '#E1EFC5'}}>
          {description}
        </Typography>
        <Box sx={{ pl: '5rem'}}>
          <Button variant="contained" href='/create-music' 
          sx={{
            backgroundColor:'#626E51', fontSize: '0.5em',
            borderRadius: '3rem',
            '&:hover': {
            backgroundColor: '#85B038',
            },
            color: 'white', fontWeight: 'bold', mt:2
          }} 
          >
            Try it now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
