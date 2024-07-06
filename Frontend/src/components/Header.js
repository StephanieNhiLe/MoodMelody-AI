import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'white', textAlign: 'left' }}>
          <Link href='/' color="inherit" underline="none">
            Mood Melody
          </Link>
        </Typography>
        <Box style={{ marginLeft: 'auto' }}>
          <Link href="/" color="inherit" underline="none" style={{ margin: '0 20px' }}>
            Home
          </Link>
          {/* <Link href="/create-music" color="inherit" underline="none" style={{ margin: '0 20px' }}>
            Create
          </Link> */}
          <Button variant="contained" href='/create-music' style={{ backgroundColor: '#A1C75E', color: 'black', marginLeft: '20px' }}>
            Create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
