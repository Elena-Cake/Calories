import React from "react";
import c from './Post.module.css'

const Post = ({ user }) => {
    return (
        <li className={c.post}>
            <img className={c.avatar} src={user.avatar} />
            <p>{user.text}</p>
            <div className={c.likegroup}>
                <button className={c.like}>
                    <img className={c.imglike} src='https://kartinkin.net/uploads/posts/2021-08/1630129775_7-kartinkin-com-p-serdtse-iz-ovoshchei-i-fruktov-yeda-krasiv-7.png' />
                </button>
                <p className={c.counter}>{user.likes}</p>
            </div>
        </li>
    )
}

export default Post;