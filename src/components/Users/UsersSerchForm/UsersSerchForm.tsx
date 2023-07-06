import React from "react";
import s from './UsersSerchForm.module.scss'
import { Field, Form, Formik } from "formik";
import { FiltersType } from "../../../redux/usersReduser";

type PropsType = {
    onChangeFilters: (filters: FiltersType) => void
}


const UsersSerchForm: React.FC<PropsType> = ({ onChangeFilters }) => {
    return (
        <div >
            <Formik
                initialValues={{
                    term: ''
                }}
                validateOnBlur
                onSubmit={(values: FiltersType) => {
                    onChangeFilters({ term: values.term })
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
