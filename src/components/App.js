import React, { Suspense, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import ProfileContainer from './Profile/ProfileContainer';
import HeaderContainer from './Header/HeaderContainer';
import Login from './Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from '../redux/appReduser';
import Preloader from './common/Preloader/Preloader';

// подрузка по мере нужности
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));


const App = (props) => {

  useEffect(() => {
    props.initializeApp()
  }, [])
  // console.log(props.isAuth)

  if (!props.initialized) {
    return <Preloader isFetching={true} />
  }
  return (
    <div className="app__wrapper">
      <HeaderContainer />
      <NavBar />
      <div className='app__wrapper_content'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId?" element={<ProfileContainer />} />
          <Route path="/dialogs/*" element={(
            <Suspense fallback={<p>Loading...</p>}>
              <DialogsContainer />
            </Suspense>)} />
          <Route path="/users" element={<UsersContainer />} />
        </Routes>
      </div>
    </div>
  )
}

const marStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth
})

// compose withRouter
export default connect(marStateToProps, { initializeApp })(App);
