import React, { Suspense, useEffect } from 'react';
import './App.scss';
import NavBar from './NavBar/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfileContainer from './Profile/ProfileContainer';
import HeaderContainer from './Header/HeaderContainer';
import Login from './Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from '../redux/appReduser.ts';
import Preloader from './common/Preloader/Preloader';

// подрузка по мере надобности
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));


const App = (props) => {


  useEffect(() => {
    props.initializeApp()
  }, [])

  if (!props.initialized) {
    return <Preloader isFetching={true} />
  }
  return (
    <div className='app'>
      <HeaderContainer />
      <div className="app__wrapper">
        <NavBar />
        <div className='app__wrapper_content'>
          <Suspense fallback={<Preloader isFetching={true} />}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/profile" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={(<DialogsContainer />)} />
              <Route path="/users" element={(<UsersContainer title="Users" />)} />
              <Route path="*" element={(<div>404 NOT FOUND</div>)} />
            </Routes>
          </Suspense>
        </div>
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
