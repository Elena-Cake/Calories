import React, { useState } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {addNewMessageElement} from '../../redux/state'



const Dialogs = ({ state, dispatch}) => {
    const [isActive, setIsActive] = useState(false)

    const dialogsElem = state.dialogsData.map((dialog, i) => <DialogItem key={i} name={dialog.name} id={dialog.id} isActive={isActive} />)
    const messagesElem = state.messagesData.map((m, i) => <Message key={i} message={m.message} />)

    const newMessage = React.createRef()

    const handleAddMessage = () => {
        dispatch(addNewMessageElement(newMessage.current.value))
        newMessage.current.value ='';
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElem}
            </div>
            <div className={s.dialogs__messages}>
                {messagesElem}
                <input ref={newMessage}></input>
                <button onClick={handleAddMessage}>Отправить</button>
            </div>
        </div>
    )
}

export default Dialogs;