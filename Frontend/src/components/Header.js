import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'white', textAlign: 'left' }}>
          Mood Melody AI
        </Typography>
        <Box style={{ marginLeft: 'auto' }}>
          <Link href="#" color="inherit" underline="none" style={{ margin: '0 20px' }}>
            Home
          </Link>
          <Link href="#" color="inherit" underline="none" style={{ margin: '0 20px' }}>
            Contact
          </Link>
          <Button variant="contained" color="secondary" style={{ marginLeft: '20px' }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
