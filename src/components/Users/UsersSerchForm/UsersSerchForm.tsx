import React from "react";
import s from './UsersSerchForm.module.scss'
import { Field, Form, Formik } from "formik";

type PropsType = {}
type UsersSearchFormObjType = {
    term: string
}

const UsersSerchForm: React.FC<PropsType> = () => {
    return (
        <div >
            <Formik
                initialValues={{
                    term: ''
                }}
                validateOnBlur
                onSubmit={(values: UsersSearchFormObjType) => {

                }}
            >
                {({ values, errors, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit} className={s.users__form}>
                        <Field
                            name='term'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.term}
                            className={s.users__form_input} />

                        <button
                            className={s.users__form_btn}
                            disabled={!isValid && !dirty}
                            type="submit"
                        >Найти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UsersSerchForm;
