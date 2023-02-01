import React, { useState } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";



const Dialogs = ({ state, sendMessae, updateNewMessaeBody}) => {
    const [isActive, setIsActive] = useState(false)

    const dialogsElem = state.dialogsData.map((dialog, i) => <DialogItem key={i} name={dialog.name} id={dialog.id} isActive={isActive} />)
    const messagesElem = state.messagesData.map((m, i) => <Message key={i} message={m.message} />)

    const newMessageBody = state.newMessageBody;

    const handleAddMessage = () => {
        sendMessae()
    }

    const onNewMessageChange = (e) => {
        let body = e.target.value;
        updateNewMessaeBody(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElem}
            </div>
            <div className={s.dialogs__messages}>
                {messagesElem}
                <input  value={newMessageBody} onChange={onNewMessageChange}></input>
                <button onClick={handleAddMessage}>Отправить</button>
            </div>
        </div>
    )
}

export default Dialogs;