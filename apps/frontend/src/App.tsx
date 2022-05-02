import React, { useEffect } from 'react';
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
import Playlist from './pages/Playlists';
import Favorites from './pages/Favorites';
import Library from './pages/Library';


import { useAppDispatch } from './store/store';
import { getTracks } from './data/musicApi';
import { setMusics } from './slices/musicSlice';

import { Music } from './types/Music';


function App() {
  const dispatch = useAppDispatch()

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

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue to-blue-dark font-sans">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='playlist' element={<Playlist />} />
              <Route path='library' element={<Library />} />
              <Route path='favorites' element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
