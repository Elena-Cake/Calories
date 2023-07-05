import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.scss';
import { Field, Form, Formik } from "formik";

const Posts = ({ posts, addPost }) => {

    const userElements = posts.map((u, i) => <Post key={i} post={u} />)
    const newPostElem = React.createRef()

    const onAddPost = () => {
        const text = newPostElem.current.value;
        addPost(text);
        newPostElem.current.value = '';
    }

    return (
        <div className={c.posts}>
            <PostsForm addPost={addPost} />
            <ul>
                {userElements}
            </ul>
        </div>
    )
}

const PostsForm = ({ addPost }) => {

    return (
        <div className={c.postsForm}>
            <Formik
                initialValues={{
                    post: ''
                }}
                validateOnBlur
                onSubmit={(values) => {
                    addPost(values.post)
                }}
            >
                {({ values, errors, touched,
                    handleChange, handleBlur,
                    isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit} className={c.posts__form}>
                        <Field
                            name='post'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.post}
                            placeholder="What's new?"
                            className={c.posts__form_input} />

                        <button className={c.posts__form_btn} disabled={!isValid && !dirty} type="submit">Опубликовать</button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default Posts;