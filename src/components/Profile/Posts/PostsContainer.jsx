import React from "react";
import Post from "./Post/Post";
import c from './Posts.module.css';
import {addPospActionCreator} from '../../../redux/profileReduser'

import Posts from "./Posts";

const PostsContainer = ({ posts, dispatch }) => {

const addPost = (text) => {
    dispatch(addPospActionCreator(text));
}

    return (
      <Posts posts={posts} addPost={addPost}/>
    )
}

export default PostsContainer;