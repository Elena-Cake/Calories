import React from "react";
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='nav'>
            <div className='nav__menu'>
                <a>Profile</a>
                <a>Messages</a>
                <a>News</a>
                <a>Music</a>
            </div>
        </nav>
    )
}

export default NavBar;