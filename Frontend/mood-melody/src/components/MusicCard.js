import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const MusicCard = ({ image, title, description }) => {
  return (
    <Card style={{ backgroundColor: '#1e1e1e', color: 'white', textAlign: 'center', width: '300px' }}>
      <CardMedia
        style={{ height: '200px' }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
        <Button variant="contained" color="secondary">
          Remix
        </Button>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
