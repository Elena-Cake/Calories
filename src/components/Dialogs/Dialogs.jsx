import React, { useState } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";



const Dialogs = ({ dialogsPage, sendMessae, updateNewMessaeBody, isAuth }) => {
    const [isActive, setIsActive] = useState(false)

    const dialogsElem = dialogsPage.dialogsData.map((dialog, i) => <DialogItem key={i} name={dialog.name} id={dialog.id} isActive={isActive} />)
    const messagesElem = dialogsPage.messagesData.map((m, i) => <Message key={i} message={m.message} />)

    const newMessageBody = dialogsPage.newMessageBody;

    const handleAddMessage = () => {
        sendMessae()
    }

    const onNewMessageChange = (e) => {
        let body = e.target.value;
        updateNewMessaeBody(body)
    }

    if (!isAuth) {
        return <Navigate to={'login'} />
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElem}
            </div>
            <div className={s.dialogs__messages}>
                {messagesElem}
                <input value={newMessageBody} onChange={onNewMessageChange}></input>
                <button onClick={handleAddMessage}>Отправить</button>
            </div>
        </div>
    )
}

export default Dialogs;