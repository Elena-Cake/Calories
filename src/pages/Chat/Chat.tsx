import React, { useEffect, useState, useRef } from 'react'
import SingleSendForm from '../../components/common/SingleSendForm/SingleSendForm';
import s from './Chat.module.scss';
import Avatar from '../../components/common/Avatar/Avatar';
import { ChatMessageType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReduser';
import { AppStateType, TypedDispatch } from '../../redux/reduxStore';


const Chat: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch<TypedDispatch>()

    const messagesAchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsActiveScroll] = useState(false)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    const messageElements = messages.map((message, i) => <Message key={i} message={message} />)

    const sendMessageHandler = (message: string) => {
        dispatch(sendMessage(message))
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsActiveScroll(true)
        } else {
            isAutoScroll && setIsActiveScroll(false)
        }
    }

    return <div className={s.chat}>
        <div className={s.chat__messages} onScroll={scrollHandler}>
            {messageElements}
            <div ref={messagesAchorRef}></div>
        </div>
        <SingleSendForm sendMessage={sendMessageHandler} statusButton={status} />
    </div>
}
export default Chat;

type propsType = {
    message: ChatMessageType
}




const Message: React.FC<propsType> = React.memo(({ message }) => {
    console.log(">>>>message");

    return (
        <div className={s.messages__item}>
            <div className={s.message__ava}>
                <Avatar userId={message.userId} photo={message.photo} />
            </div>
            <h2 className={s.message__name}>{message.userName}</h2>
            <p className={s.message__body}>{message.message}</p>
        </div>
    )
})