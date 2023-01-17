import React from 'react';
import './App.css';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import Dialogs from './Dialogs/Dialogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app__wrapper">
        <Header />
        <NavBar />
        <div className='app__wrapper_content'>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs" element={<Dialogs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
