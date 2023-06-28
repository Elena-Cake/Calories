import React, { useState } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { initialStateDialogsType } from "../../redux/dialogsReduser";

type dialogsType = {
    dialogsPage: initialStateDialogsType
    sendMessage: (newMessage: string) => void
    isAuth: boolean
}

const Dialogs: React.FC<dialogsType> = ({ dialogsPage, sendMessage, isAuth }) => {
    const [isActive, setIsActive] = useState(false)

    const dialogsElem = dialogsPage.dialogsData.map((dialog, i) => <DialogItem key={i} name={dialog.name} id={dialog.id} isActive={isActive} />)
    const messagesElem = dialogsPage.messagesData.map((m, i) => <Message key={i} message={m.message} />)


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
                <MessageForm sendMessage={sendMessage} />
            </div>
        </div>
    )
}

type messageType = { sendMessage: (newMessage: string) => void }

const MessageForm: React.FC<messageType> = ({ sendMessage }) => {
    return (
        <div className={s.dialogs__messages}>
            <Formik
                initialValues={{
                    message: '',
                }}
                validateOnBlur
                onSubmit={(values) => {
                    sendMessage(values.message)
                }}
            >
                {({ values, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit}>
                        <Field
                            name='message'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            placeholder="What do your wonna send?" />
                        <button disabled={!isValid && !dirty} type="submit">Отправить</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Dialogs;