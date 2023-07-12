import React, { useEffect, useState } from 'react'
import SingleSendForm from '../../components/common/SingleSendForm/SingleSendForm';
import s from './Chat.module.scss';
import Avatar from '../../components/common/Avatar/Avatar';

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Chat: React.FC = () => {
    const [messages, setMessages] = useState([] as ChatMessageType[])

    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])


    const messageElements = messages.map((message, i) => <Message key={i} message={message} />)

    const sendMessage = (message: string) => {
        wsChanel.send(message)
    }


    return <div className={s.chat}>
        <div className={s.chat__messages}>
            {messageElements}
        </div>
        <SingleSendForm sendMessage={sendMessage} />
    </div>
}
export default Chat;

type propsType = {
    message: ChatMessageType
}

type ChatMessageType = {
    photo: string,
    userName: string,
    message: string,
    userId: number
}


const Message: React.FC<propsType> = ({ message }) => {

    // const message: ChatMessageType = {
    //     photo: ' https://cdn-icons-png.flaticon.com/512/6386/6386976.png',
    //     userName: 'User',
    //     message: 'Hi',
    //     userId: 2
    // }

    return (
        <div className={s.messages__item}>
            <div className={s.message__ava}>
                <Avatar userId={message.userId} photo={message.photo} />
            </div>
            {/* <h2>{message.userName}</h2> */}
            <p className={s.message__body}>{message.message}</p>
        </div>
    )
}