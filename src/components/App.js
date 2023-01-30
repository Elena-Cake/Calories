import React from 'react';
import './App.css';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import DialogsContainer from './Dialogs/DialogsContainer';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="app__wrapper">
      <Header />
      <NavBar />
      <div className='app__wrapper_content'>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dialogs" element={<DialogsContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
