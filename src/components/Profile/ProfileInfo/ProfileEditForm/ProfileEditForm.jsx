import React from "react";
import c from './ProfileEditForm.module.css'
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { updateProfile } from "../../../../redux/profileReduser";
import { connect } from "react-redux";

const ProfileEditForm = ({ profile, onSubmit }) => {
    const contactElements = []
    for (let contact in profile.contacts) {
        contactElements.push(
            <li key={contact} className={c.contact__item}>
                <label>{contact}</label>
                <input placeholder={profile.contacts.contact || ''} />
            </li>)
    }

    const validationsSchema = yup.object().shape({
        facebook: yup.string().url().nullable(),
        website: yup.string().url().nullable(),
        vk: yup.string().url().nullable(),
        twitter: yup.string().url().nullable(),
        instagram: yup.string().url().nullable(),
        youtube: yup.string().url().nullable(),
        github: yup.string().url().nullable(),
        mainLink: yup.string().url().nullable()
    })

    return (
        <div>
            <Formik
                initialValues={{
                    facebook: profile.contacts.facebook,
                    website: profile.contacts.website,
                    vk: profile.contacts.vk,
                    twitter: profile.contacts.twitter,
                    instagram: profile.contacts.instagram,
                    youtube: profile.contacts.youtube,
                    github: profile.contacts.github,
                    mainLink: profile.contacts.mainLink,
                    lookingForAJob: profile.lookingForAJob,
                    lookingForAJobDescription: profile.lookingForAJobDescription,
                    // aboutMe: profile.aboutMe
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
                        <div className={c.edit__item}>
                            <label >facebook</label>
                            <Field
                                name='facebook'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facebook || ''}
                                placeholder="What your facebook?" />
                            <ErrorMessage className={c.input__error} name="facebook" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >website</label>
                            <Field
                                name='website'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.website || ''}
                                placeholder="What your website?" />
                            <ErrorMessage className={c.input__error} name="website" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >vk</label>
                            <Field
                                name='vk'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.vk || ''}
                                placeholder="What your vk?" />
                            <ErrorMessage className={c.input__error} name="vk" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >twitter</label>
                            <Field
                                name='twitter'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.twitter || ''}
                                placeholder="What your twitter?" />
                            <ErrorMessage className={c.input__error} name="twitter" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >instagram</label>
                            <Field
                                name='instagram'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.instagram || ''}
                                placeholder="What your instagram?" />
                            <ErrorMessage className={c.input__error} name="instagram" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >youtube</label>
                            <Field
                                name='youtube'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.youtube || ''}
                                placeholder="What your youtube?" />
                            <ErrorMessage className={c.input__error} name="youtube" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >github</label>
                            <Field
                                name='github'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.github || ''}
                                placeholder="What your github?" />
                            <ErrorMessage className={c.input__error} name="github" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >mainLink</label>
                            <Field
                                name='mainLink'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mainLink || ''}
                                placeholder="What your mainLink?" />
                            <ErrorMessage className={c.input__error} name="mainLink" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >lookingForAJob</label>
                            <Field
                                name='lookingForAJob'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                selected={values.lookingForAJob}
                                type={"checkbox"} />
                            <ErrorMessage className={c.input__error} name="lookingForAJob" component="span"></ErrorMessage>
                        </div>
                        <div className={c.edit__item}>
                            <label >lookingForAJobDescription</label>
                            <Field
                                name='lookingForAJobDescription'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lookingForAJobDescription || ''}
                                placeholder="What your new job expectations?" />
                            <ErrorMessage className={c.input__error} name="lookingForAJobDescription" component="span"></ErrorMessage>
                        </div>
                        {/* <div className={c.edit__item}>
                            <label >aboutMe</label>
                            <Field
                                name='aboutMe'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.aboutMe || ''}
                                placeholder="What your aboutMe?" />
                            <ErrorMessage className={c.input__error} name="aboutMe" component="span"></ErrorMessage>
                        </div> */}

                        <button disabled={!isValid && !dirty} type="submit">Сохранить</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const ProfileForm = ({ profile, updateProfile }) => {
    const onSubmit = (values) => {
        updateProfile({
            userId: profile.userId,
            fullName: profile.fullName,
            lookingForAJob: values.lookingForAJob,
            lookingForAJobDescription: values.lookingForAJobDescription,
            contacts: {
                github: values.github,
                vk: values.vk,
                facebook: values.facebook,
                instagram: values.instagram,
                twitter: values.twitter,
                website: values.website,
                youtube: values.youtube,
                mainLink: values.mainLink
            }
        })
    }

    return (
        <ProfileEditForm onSubmit={onSubmit} profile={profile} />
    )
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, { updateProfile })(ProfileForm);
