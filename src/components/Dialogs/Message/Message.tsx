import React from "react";
import s from './Message.module.css'

type propsType = { message: string }

const Message: React.FC<propsType> = ({ message }) => {
    return (
        <div className={s.messages__item}>
            {message}
        </div>
    )
}

export default Message;