import React from "react";
import { NavLink } from "react-router-dom";
import c from './Header.module.css'

const Header = (props) => {
    return (
        <div className={c.header}>
            <img className={c.header__logo} src='https://автолого.рф/wp-content/uploads/polestar-logo-1366x768-1024x576.png' alt=" " />
            <div className={c.login__block}>
                {props.isAuth ? <NavLink className={c.login__text} to={'login'}>{props.login}</NavLink> :
                    <NavLink className={c.login__text} to={'login'}>Login</NavLink>}
            </div>
        </div>
    )
}

export default Header;