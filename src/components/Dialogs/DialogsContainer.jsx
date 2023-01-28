import React, { useState } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {updateNewMessaeBodyCreator, sendMessaeCreator} from '../../redux/dialogsReduser'
import Dialogs from "./Dialogs";



const DialogsContainer = ({ state, dispatch}) => {
  
    const onSendMessae = () => {
        dispatch(sendMessaeCreator())
    }

    const onUpdateNewMessaeBody = (body) => {
        dispatch(updateNewMessaeBodyCreator(body))
    }

    return (
        <Dialogs state={state} sendMessae={onSendMessae} updateNewMessaeBody={onUpdateNewMessaeBody}/>
    )
}

export default DialogsContainer;