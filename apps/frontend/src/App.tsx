import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import SignIn from './pages/SignIn';
import Home from './pages/Home'
import Layout from './components/Layout';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#234580',
      },
      secondary: {
        main: '#FFE922'
      }
    },
  });

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue to-blue-dark font-sans">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />}/>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
