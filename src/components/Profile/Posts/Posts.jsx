import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css';
import { addPospActionCreator } from '../../../redux/state'

const Posts = ({ posts, dispatch }) => {

    const userElements = posts.map((u, i) => <Post key={i} user={u} />)
    const newPostElem = React.createRef()

    const addPostUI = () => {
        const text = newPostElem.current.value;
        dispatch(addPospActionCreator(text));
        newPostElem.current.value = '';
    }

    return (
        <div className={c.posts}>
            <div className={c.addGroup}>
                <input className={c.input} ref={newPostElem}></input>
                <button className={c.btnAdd} onClick={addPostUI}>add</button>
            </div>
            <ul>
                {userElements}
            </ul>
        </div>
    )
}

export default Posts;