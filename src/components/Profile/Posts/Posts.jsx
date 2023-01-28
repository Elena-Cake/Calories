import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css';

const Posts = ({ posts, addPost}) => {

    const userElements = posts.map((u, i) => <Post key={i} user={u} />)
    const newPostElem = React.createRef()

    const onAddPost = () => {
        const text = newPostElem.current.value;
        addPost(text);
        newPostElem.current.value ='';
    }

    return (
        <div className={c.posts}>
            <div>
                <input ref={newPostElem}></input>
                <button onClick={onAddPost}>add</button>
            </div>
            <ul>
                {userElements}
            </ul>
        </div>
    )
}

export default Posts;