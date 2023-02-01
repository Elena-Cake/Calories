import React from "react";

import Posts from "./Posts";
import { connect } from "react-redux";



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
    dispatch.addPospActionCreator(text)
  }
}
  )
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps )(Posts)

export default PostsContainer;