import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontFamily: 'revert', flexGrow: 1, color: 'white', textAlign: 'left', pl: 15}}>
          <Link href='/' color="inherit" underline="none">
            MoodMelody.AI
          </Link>
        </Typography>
        <Box sx={{ marginLeft: 'auto', pr: 15}}>
          <Link variant="h6" href="/" color="inherit" underline="none" sx={{ fontFamily: 'revert',flexGrow: 1, pr: 5  }}>
            Home
          </Link>
          {/* <Link href="/create-music" color="inherit" underline="none" style={{ margin: '0 20px' }}>
            Create
          </Link> */}
          <Button variant="contained" href='/create-music' style={{ fontFamily: 'revert',flexGrow: 1, pr: 5, backgroundColor: '#A1C75E', color: 'black' }}>
            Create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
