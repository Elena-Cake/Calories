import React from "react";
import s from './SingleSendForm.module.scss'
import { Field, Form, Formik } from "formik";

type PropsType = {
    sendMessage: (message: string) => void
}


const SingleSendForm: React.FC<PropsType> = ({ sendMessage }) => {

    return (
        <div >
            <Formik
                initialValues={{
                    message: '',
                }}
                validateOnBlur
                onSubmit={(values) => {
                    sendMessage(values.message)
                    values.message = ''
                }}
            >
                {({ values, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit} className={s.messages__form}>
                        <Field
                            name='message'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            placeholder="What do your wonna send?"
                            className={s.messages__form_input} />
                        <button disabled={!isValid && !dirty} type="submit" className={s.dialogs__sendBtn}>Отправить</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SingleSendForm;