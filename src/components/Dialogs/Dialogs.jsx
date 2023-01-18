import React, { useState } from "react";
import s from './Dialogs.module.css'
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

const Message = ({ message }) => {
    return (
        <div className={s.messages__item}>
            {message}
        </div>
    )
}

const Dialogs = () => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                <DialogItem name='Dima' id='1' isActive={isActive} />
                <DialogItem name='Lena' id='2' isActive={true} />
            </div>
            <div className={s.dialogs__messages}>
                <Message message='hi' />
                <Message message='sova' />
                <Message message='sova' />
            </div>
        </div>
    )
}

export default Dialogs;