import React from "react";
import { NavLink } from "react-router-dom";
import './Header.scss'

const Header = (props) => {
    const onSubmit = (values) => {
        const { email, password, isRobot } = values
        const rememberMe = !isRobot
        props.logoutMe(email, password, rememberMe)
    }
    return (
        <div className='header'>
            <img className='header__logo' src='https://автолого.рф/wp-content/uploads/polestar-logo-1366x768-1024x576.png' alt=" " />
            <div className='login__block'>
                {props.isAuth ? (
                    <div>
                        <NavLink className='login__text' to={'/profile'}>{props.login}</NavLink>
                        <button onClick={onSubmit}>Logout</button>
                    </div >
                ) :
                    <NavLink className='login__text' to={'login'}>Login</NavLink>
                }
            </div>
        </div>
    )
}

export default Header;