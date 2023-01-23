import React, { useState } from "react";
import s from './Dialogs.module.css'
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem'
import Message from "./Message/Message";



const Dialogs = ({ state }) => {
    const [isActive, setIsActive] = useState(false)

    const dialogsElem = state.dialogsData.map((dialog, i) => <DialogItem key={i} name={dialog.name} id={dialog.id} isActive={isActive} />)

    const messagesElem = state.messagesData.map((m, i) => <Message key={i} message={m.message} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElem}
            </div>
            <div className={s.dialogs__messages}>
                {messagesElem}
            </div>
        </div>
    )
}

export default Dialogs;