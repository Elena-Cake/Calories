import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css'

const Posts = ({ posts }) => {

    const userElements = posts.map((u, i) => <Post key={i} user={u} />)

    return (
        <div className={c.posts}>
            <div>
                <input></input>
                <button>add</button>
            </div>
            <ul>
                {userElements}
            </ul>
        </div>
    )
}

export default Posts;