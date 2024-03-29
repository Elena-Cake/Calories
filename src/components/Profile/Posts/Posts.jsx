import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css';
import { Field, Form, Formik } from "formik";

const Posts = ({ posts, addPost }) => {

    const userElements = posts.map((u, i) => <Post key={i} user={u} />)
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
        <div>
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

                    <Form onSubmit={handleSubmit}>
                        <Field
                            name='post'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.post}
                            placeholder="What are you feeling?" />

                        <button disabled={!isValid && !dirty} type="submit">add</button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default Posts;