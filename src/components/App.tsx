import React, { Suspense, useEffect } from 'react';
import './App.scss';
import NavBar from './NavBar/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfileContainer from './Profile/ProfileContainer';
import HeaderContainer from './Header/HeaderContainer';
import Login from './Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from '../redux/appReduser';
import Preloader from './common/Preloader/Preloader';
import NotFound from './NotFound/NotFound';
import { AppStateType } from '../redux/reduxStore';

// подрузка по мере надобности
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));
const Chat = React.lazy(() => import('../pages/Chat/Chat'));

const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {

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
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={(<DialogsContainer />)} />
              <Route path="/users" element={(<UsersContainer />)} />
              <Route path="/chat" element={(<Chat />)} />
              <Route path="*" element={(<NotFound />)} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth
})

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

// compose withRouter
export default connect(mapStateToProps, { initializeApp })(App);
