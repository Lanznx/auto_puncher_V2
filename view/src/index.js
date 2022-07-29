import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Pages/components/Header';
import Footer from './Pages/components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      main: '#D64550',
      contrastText: '#000',
    },
  },
  typography: {
    allVariants: {
      fontFamily: [
        '"Noto Sans TC"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
});

root.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </ThemeProvider>
  </React.Fragment>,
);
