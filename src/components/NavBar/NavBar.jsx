import React from "react";
import { NavLink } from "react-router-dom";
import s from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.nav__menu}>
                <NavLink to="/profile"
                    className={(state) => state.isActive ?
                        `${s.navlink} ${s.active}` : `${s.navlink}`}>
                    Profile
                </NavLink>
                <NavLink to="/dialogs"
                    className={(state) => state.isActive ?
                        `${s.navlink} ${s.active}` : `${s.navlink}`}>
                    Messages
                </NavLink>
                <NavLink to="/news"
                    className={(state) => state.isActive ?
                        `${s.navlink} ${s.active}` : `${s.navlink}`}>
                    News
                </NavLink>
                <NavLink to="/music"
                    className={(state) => state.isActive ?
                        `${s.navlink} ${s.active}` : `${s.navlink}`}>
                    Music
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;
