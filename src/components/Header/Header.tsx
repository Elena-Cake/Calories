import React from "react";
import { NavLink } from "react-router-dom";
import './Header.scss'
import Avatar from "../common/Avatar/Avatar";

type propsType = {
    logoutMe: () => void
    isAuth: boolean
    login: string | null
}

const Header: React.FC<propsType> = (props) => {
    const onSubmit = () => {
        props.logoutMe()
    }
    return (
        <div className='header'>
            <img className='header__logo' src='https://автолого.рф/wp-content/uploads/polestar-logo-1366x768-1024x576.png' alt="логотип" />
            <div className='login__block'>
                {props.isAuth ? (
                    <div>
                        <NavLink className='login__text' to={'/profile'}>{props.login}</NavLink>
                        <button className='login__btn' onClick={onSubmit}>Logout</button>
                    </div >
                ) :
                    <NavLink className='login__btn' to={'login'}>Login</NavLink>
                }
            </div>
        </div>
    )
}

export default Header;