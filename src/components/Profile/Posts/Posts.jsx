import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css'

const users = [
    {
        avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photo.png',
        text: 'кушаю',
        likes: 3
    }
    ,
    {
        avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg',
        text: 'худею',
        likes: 33
    }
]

const Posts = () => {
    return (
        <div className={c.posts}>
            <div>
                <input></input>
                <button>add</button>
            </div>
            <ul>
                <Post user={users[0]} />
                <Post user={users[1]} />
            </ul>
        </div>
    )
}

export default Posts;