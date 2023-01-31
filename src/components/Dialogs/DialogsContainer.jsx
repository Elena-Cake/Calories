import React, { useState } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {updateNewMessaeBodyCreator, sendMessaeCreator} from '../../redux/dialogsReduser'
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";



const DialogsContainer = () => {
  
    return 
    <StoreContext.Consumer>
        { (store) => {
            const onSendMessae = () => {
            store.dispatch(sendMessaeCreator())
            }
        
            const onUpdateNewMessaeBody = (body) => {
                store.dispatch(updateNewMessaeBodyCreator(body))
            }
        return <Dialogs state={store} sendMessae={onSendMessae} updateNewMessaeBody={onUpdateNewMessaeBody}/>
    }}
    </StoreContext.Consumer>
}

export default DialogsContainer;