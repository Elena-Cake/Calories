import React from "react";
import s from './UsersSerchForm.module.scss'
import { Field, Form, Formik } from "formik";
import { FiltersType } from "../../../redux/usersReduser";
import { getFilters } from "../../../redux/users-selectors";
import { useSelector } from "react-redux";

type PropsType = {
    onChangeFilters: (filters: FiltersType) => void
}
type FormType = {
    term: '',
    friend: 'null' | 'true' | 'false'
}


const UsersSerchForm: React.FC<PropsType> = ({ onChangeFilters }) => {

    const filters = useSelector(getFilters)

    return (
        <div >
            <Formik
                enableReinitialize
                initialValues={{
                    term: filters.term,
                    friend: String(filters.friend) as 'null' | 'true' | 'false'
                } as FormType}
                validateOnBlur
                onSubmit={(values: FormType) => {
                    const friend = values.friend === 'null' ? null :
                        values.friend === 'true' ? true : false
                    onChangeFilters({ term: values.term, friend: friend })
                }
                }
            >
                {({ values, errors, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit} >
                        <div className={s.users__form}>
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
                        </div>
                        <Field as="select" name="friend" className={s.users__form_select}>
                            <option value="null">Все</option>
                            <option value="true">Друзья</option>
                            <option value="false">Пока не друзья</option>
                        </Field>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UsersSerchForm;
