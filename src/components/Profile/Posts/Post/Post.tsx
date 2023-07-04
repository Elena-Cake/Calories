import React from "react";
import c from './Post.module.css'
import { postType } from "../../../../types/types";

type PropsType = {
    posts: postType
}

const Post: React.FC<PropsType> = ({ posts }) => {
    return (
        <li className={c.post}>
            <img className={c.avatar} src={posts.avatar} alt="avatar" />
            <p>{posts.text}</p>
            <div className={c.likegroup}>
                <button className={c.like}>
                    <img className={c.imglike} src='https://kartinkin.net/uploads/posts/2021-08/1630129775_7-kartinkin-com-p-serdtse-iz-ovoshchei-i-fruktov-yeda-krasiv-7.png' alt="likes" />
                </button>
                <p className={c.counter}>{posts.likes}</p>
            </div>
        </li>
    )
}

export default Post;