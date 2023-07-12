import React, { useEffect, useState } from 'react'
import SingleSendForm from '../../components/common/SingleSendForm/SingleSendForm';
import s from './Chat.module.scss';
import Avatar from '../../components/common/Avatar/Avatar';


const Chat: React.FC = () => {
    const [messages, setMessages] = useState([] as ChatMessageType[])
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)

    useEffect(() => {
        const updateMessages = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChanel?.addEventListener('message', updateMessages)
        return () => {
            wsChanel?.removeEventListener('message', updateMessages)
        }
    }, [wsChanel])

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            console.error('CLOSE WS')
            setTimeout(createChanel, 3000)
        }

        function createChanel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }
        createChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    const messageElements = messages.map((message, i) => <Message key={i} message={message} />)

    const sendMessage = (message: string) => {
        wsChanel ? wsChanel.send(message) : console.error("NO WS CHANEL")
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

    return (
        <div className={s.messages__item}>
            <div className={s.message__ava}>
                <Avatar userId={message.userId} photo={message.photo} />
            </div>
            <h2 className={s.message__name}>{message.userName}</h2>
            <p className={s.message__body}>{message.message}</p>
        </div>
    )
}