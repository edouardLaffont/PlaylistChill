import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';
import Suggestions from './pages/Suggestions';


import { useAppDispatch, useAppSelector } from './store/store';
import { getTracks } from './data/musicApi';
import { handleIsPlaying, setMusics } from './slices/musicSlice';

import { Music } from './types/Music';


function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const { isPlaying } = useAppSelector(store => store.music)
  const { isLoggedIn } = useAppSelector(store => store.auth)

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

  useEffect(() => {
    getTracks()
      .then((tracks: Array<Music>) => dispatch(setMusics(tracks)))
  }, [])

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/signin')
    }
  }, [isLoggedIn])

  document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space"     
    ) {
      dispatch(handleIsPlaying(!isPlaying))
    }
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue to-blue-dark font-sans">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='suggestions' element={<Suggestions />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
