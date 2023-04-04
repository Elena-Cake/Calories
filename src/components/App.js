import React from 'react';
import './App.css';
import NavBar from './NavBar/NavBar';
import DialogsContainer from './Dialogs/DialogsContainer';
import { Route, Routes } from 'react-router-dom';
import UsersContainer from './Users/UsersContainer';
import ProfileContainer from './Profile/ProfileContainer';
import HeaderContainer from './Header/HeaderContainer';

const App = () => {
  return (
    <div className="app__wrapper">
      <HeaderContainer />
      <NavBar />
      <div className='app__wrapper_content'>
        <Routes>
          <Route path="/profile/:userId?" element={<ProfileContainer />} />
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
