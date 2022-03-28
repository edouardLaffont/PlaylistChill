import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import SignIn from './pages/SignIn';
import Home from './pages/Home'
import Layout from './components/Layout';

function App() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue to-blue-dark font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}/>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
