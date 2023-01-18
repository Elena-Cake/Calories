import React, { useState } from "react";
import s from './DialogItem.module.css'
import { NavLink } from "react-router-dom";



const DialogItem = ({ name, id, isActive }) => {
    return (
        <div className={s.dialogs__item + ' ' + (isActive ? s.dialogs__item_active : '')}>
            <NavLink to={"/dialogs/" + id} className={s.dialogs__item_link}>
                {name}
            </NavLink>
        </div>
    )
}

export default DialogItem;