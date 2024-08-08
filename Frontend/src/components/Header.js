import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ 
        width: 250, 
        bgcolor: '#0A1929', // Background color of the drawer
        height: '100%',
        color: 'white', // Text color in the drawer
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align the text
        pt: 4 // Padding from the top
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component="a" href="/" sx={{ justifyContent: 'center' }}>
          <ListItemText primary="Home" sx={{ textAlign: 'center', color: 'white', pt: 3 }} />
        </ListItem>
        <ListItem button component="a" href="/create-music" sx={{ justifyContent: 'center' }}>
          <ListItemText primary="Create" sx={{ textAlign: 'center', color: 'white', pt: 3}} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontFamily: 'revert', flexGrow: 1, color: 'white', textAlign: 'left', pl: isMobile ? 1 : 15 }}>
          <Link href='/' color="inherit" underline="none">
            MoodMelody.AI
          </Link>
        </Typography>
        <Box sx={{ marginLeft: 'auto', pr: isMobile ? 1 : 15 }}>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {list()}
              </Drawer>
            </>
          ) : (
            <>
              <Link variant="h6" href="/" color="inherit" underline="none" sx={{ fontFamily: 'revert', flexGrow: 1, pr: 5 }}>
                Home
              </Link>
              <Button variant="contained" href='/create-music' style={{ fontFamily: 'revert', flexGrow: 1, pr: 5, backgroundColor: '#A1C75E', color: 'black' }}>
                Create
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
