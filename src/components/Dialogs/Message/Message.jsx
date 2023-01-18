import React, { useState } from "react";
import s from './Message.module.css'


const Message = ({ message }) => {
    return (
        <div className={s.messages__item}>
            {message}
        </div>
    )
}

export default Message;