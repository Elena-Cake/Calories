import React from "react";
import { NavLink } from "react-router-dom";
import s from './Login.module.css'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';


const LoginForm = () => {
    const validationsSchema = yup.object().shape({
        login: yup.string().typeError('String').required('Required'),
        password: yup.string().typeError('String').required('Required'),
        confirmPassword: yup.string().typeError('String').oneOf([yup.ref('password')], 'not equal pass').required('Required'),
    })
    return (
        <div>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    confirmPassword: '',
                    isRobot: false
                }}
                validateOnBlur
                validationSchema={validationsSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ values, errors, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit}>
                        <div className={s.form__input}>
                            <label >Login</label>
                            <Field
                                name='login'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.login}
                                placeholder="What your login?" />
                            <ErrorMessage className={s.input__error} name="login" component="span"></ErrorMessage>
                        </div>
                        <div className={s.form__input}>
                            <label htmlFor={'password'}>Password</label>
                            <Field
                                name={'password'}
                                type={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="What your password?" />
                            <ErrorMessage className={s.input__error} name="password" component="span"></ErrorMessage>
                        </div>
                        <div className={s.form__input}>
                            <label htmlFor={'confirmPassword'}>Confirm Password</label>
                            <Field
                                name={'confirmPassword'}
                                type={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder="Copy pass)" />
                            <ErrorMessage className={s.input__error} name="confirmPassword" component="span"></ErrorMessage>
                        </div>
                        <div className={s.form__input}>
                            <label htmlFor={'isRobot'}>I'm not a robot</label>
                            <Field
                                name={'isRobot'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                selected={!values.isRobot}
                                type={"checkbox"} />
                        </div>
                        <button disabled={!isValid && !dirty} type="submit">Сome in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}




const Login = () => {

    return (
        <div >
            <h1>LOGIN</h1>
            <LoginForm />
        </div>
    )
}

export default Login;
