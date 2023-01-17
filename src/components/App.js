import React from 'react';
import './App.css';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';

const App = () => {
  return (
    <div className="app__wrapper">
      <Header />
      <NavBar />
      <Profile />
    </div>
  );
}

export default App;
