import React from "react";

import Posts from "./Posts";
import { connect } from "react-redux";

import {addPostActionCreator} from '../../../redux/profileReduser'



const mapStateToProps = (state) => {
  return (
{
  posts: state.profilePage.posts
}
  )
}

const mapDispatchToProps = (dispatch) => {
  return (
{
  addPost: (text) => {
    dispatch(addPostActionCreator(text))
  }
}
  )
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)

export default PostsContainer;