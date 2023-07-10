import React from "react";
import { useNavigate } from "react-router-dom";
import s from './Login.module.scss'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { loginMe } from "../../redux/authReduser";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType, TypedDispatch } from "../../redux/reduxStore";

type valuesType = {
    email: string,
    password: string,
    confirmPassword?: string,
    isRobot: boolean,
    captcha?: string | null
}

type PropsType = {
    onSubmit: (values: valuesType) => void
}


const LoginForm: React.FC<PropsType> = ({ onSubmit }) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const validationsSchema = yup.object().shape({
        email: yup.string().typeError('String').required('Required'),
        password: yup.string().typeError('String').required('Required'),
        // confirmPassword: yup.string().typeError('String').oneOf([yup.ref('password')], 'not equal pass').required('Required'),
    })
    return (
        <div className={s.login}>
            <h1 className={s.login__title}>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    isRobot: false,
                    captcha: null
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
                            <label>Email</label>
                            <Field
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="What your email?"
                                className={s.login__formItem} />
                            <ErrorMessage className={s.input__error} name="email" component="span"></ErrorMessage>
                        </div>
                        <div className={s.form__input}>
                            <label>Password</label>
                            <Field
                                name={'password'}
                                type={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="What your password?"
                                className={s.login__formItem} />
                            <ErrorMessage className={s.input__error} name="password" component="span"></ErrorMessage>
                        </div>
                        {/* <div className={s.form__input}>
                            <label htmlFor={'confirmPassword'}>Confirm Password</label>
                            <Field
                                name={'confirmPassword'}
                                type={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder="Copy pass)" />
                            <ErrorMessage className={s.input__error} name="confirmPassword" component="span"></ErrorMessage>
                        </div> */}
                        <div className={s.form__input}>
                            <label >I'm not a robot</label>
                            <Field
                                name={'isRobot'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                selected={!values.isRobot}
                                type={"checkbox"} />
                        </div>
                        {captchaUrl &&
                            <img src={captchaUrl} />
                        }
                        {captchaUrl &&
                            <Field
                                name={'captcha'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required />
                        }
                        <button className={s.login__btnOkey} disabled={!isValid && !dirty} type="submit">Сome in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<TypedDispatch>()

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const onSubmit = (values: valuesType) => {
        const { email, password, isRobot, captcha = null } = values
        const rememberMe = !isRobot
        dispatch(loginMe(email, password, rememberMe, captcha))
    }
    if (isAuth) {
        navigate("/profile")
    }
    return (
        <div >
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;
