import React from 'react';
import './App.css';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import DialogsContainer from './Dialogs/DialogsContainer';
import { Route, Routes } from 'react-router-dom';

const App = ({ state, dispatch }) => {
  return (
    <div className="app__wrapper">
      <Header />
      <NavBar />
      <div className='app__wrapper_content'>
        <Routes>
          <Route path="/profile" element={<Profile state={state.profilePage} dispatch={dispatch} />} />
          <Route path="/dialogs" element={<DialogsContainer state={state.dialogsPage} dispatch={dispatch} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
