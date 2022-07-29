import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import logo from '../../Assets/logo.png';
export default function Header() {
  return (
    <header>
      <AppBar sx={{ flexGrow: 1, position: 'static', boxShadow: 0 }}>
        <Toolbar
          sx={{
            boxShadow: 2,
            flexWrap: 'wrap',
          }}
        >
          <Grid container sx={{ alignContent: 'space-between' }}>
            <IconButton color="inherit" aria-label="menu" href="/">
              <img src={logo} alt="smiling_sea" width={30} height={30} />
            </IconButton>
            <Button href="/" color="inherit">
              Home
            </Button>
            <Button href="profile" color="inherit">
              Profile
            </Button>
            <Button href="signIn" color="inherit">
              SignIn
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}
