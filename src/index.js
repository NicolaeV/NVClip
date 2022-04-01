import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'typeface-roboto'
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from './components/HomePage';
import Helmet from 'react-helmet';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Nicolae's Website</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} title="Nicolae's Website" />
          <Route path="/clips" element={<App />} title="Nicolae's Website" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
