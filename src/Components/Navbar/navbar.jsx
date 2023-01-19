import { Toolbar } from '@mui/material';
import React from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
const NavBar = () => {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div'>
            Path-Finding Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
