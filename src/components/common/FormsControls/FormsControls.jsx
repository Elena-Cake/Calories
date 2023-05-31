import React from "react";
import s from './FormsControls.module.css'
import { ErrorMessage, Field } from "formik";

const InputWithErrorRight = ({ }) => {
    return (
        <div className={s.form__input}>
            <label >Login</label>
            <Field
                // component={}
                //     name='login'
                //     onChange={handleChange}
                //     onBlur={handleBlur}
                //     value={values.login}
                placeholder="What your login?" />
            <ErrorMessage className={s.input__error} name="login" component="span"></ErrorMessage>
        </div>
    )
}

export default InputWithErrorRight;