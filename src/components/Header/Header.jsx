import React from "react";
import c from './Header.module.css'

const Header = () => {
    return (
        <div className={c.header}>
            <img className={c.header__logo} src='https://автолого.рф/wp-content/uploads/polestar-logo-1366x768-1024x576.png' />
        </div>
    )
}

export default Header;