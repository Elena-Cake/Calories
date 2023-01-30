import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css'

const Posts = ({ posts }) => {

    const userElements = posts.map((u, i) => <Post key={i} user={u} />)

    return (
        <div className={c.posts}>
            <div className={c.addGroup}>
                <input className={c.input}></input>
                <button className={c.btnAdd}>add</button>
            </div>
            <ul>
                {userElements}
            </ul>
        </div>
    )
}

export default Posts;