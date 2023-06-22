import React from "react";
import { useNavigate } from "react-router-dom";
import s from './Login.module.scss'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { loginMe } from "../../redux/authReduser";
import { connect } from "react-redux";


const LoginForm = ({ onSubmit, captchaUrl }) => {
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
                            <label htmlFor={'isRobot'}>I'm not a robot</label>
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


const Login = ({ isAuth, loginMe, captchaUrl }) => {
    const navigate = useNavigate();
    const onSubmit = (values) => {
        const { email, password, isRobot, captcha = null } = values
        const rememberMe = !isRobot
        loginMe(email, password, rememberMe, captcha)
    }
    if (isAuth) {
        navigate("/profile")
    }
    return (
        <div >
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginMe })(Login);
