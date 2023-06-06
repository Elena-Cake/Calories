import React from "react";
import { useNavigate } from "react-router-dom";
import s from './Login.module.css'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { loginMe } from "../../redux/authReduser";
import { connect } from "react-redux";


const LoginForm = ({ onSubmit }) => {
    const validationsSchema = yup.object().shape({
        email: yup.string().typeError('String').required('Required'),
        password: yup.string().typeError('String').required('Required'),
        confirmPassword: yup.string().typeError('String').oneOf([yup.ref('password')], 'not equal pass').required('Required'),
    })
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    isRobot: false
                }}
                validateOnBlur
                validationSchema={validationsSchema}
                onSubmit={(values) => {
                    onSubmit(values)
                }}
            >
                {({ values, errors, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit}>
                        <div className={s.form__input}>
                            <label >Email</label>
                            <Field
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="What your email?" />
                            <ErrorMessage className={s.input__error} name="email" component="span"></ErrorMessage>
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


const Login = ({ isAuth, loginMe }) => {
    const navigate = useNavigate();
    const onSubmit = (values) => {
        const { email, password, isRobot } = values
        const rememberMe = !isRobot
        loginMe(email, password, rememberMe)
    }
    if (isAuth) {
        navigate("/profile")
    }
    return (
        <div >
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginMe })(Login);
