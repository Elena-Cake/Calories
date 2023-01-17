import React from "react";
import classes from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.nav__menu}>
                <a>Profile</a>
                <a>Messages</a>
                <a>News</a>
                <a>Music</a>
            </div>
        </nav>
    )
}

export default NavBar;