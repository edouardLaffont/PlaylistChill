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
import Playlist from './pages/Playlists';
import Favorites from './pages/Favorites';
import Library from './pages/Library';

import { Provider } from 'react-redux';
import store from './store/store';

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
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<SignIn />}/>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path='playlist' element={<Playlist />}/>
                <Route path='library' element={<Library />}/>
                <Route path='favorites' element={<Favorites />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
