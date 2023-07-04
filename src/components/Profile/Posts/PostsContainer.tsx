import React from "react";

import Posts from "./Posts";
import { connect } from "react-redux";

import { actions } from '../../../redux/profileReduser'
import { AppStateType } from "../../../redux/reduxStore";
import { postType } from "../../../types/types";

type MapPropsType = {
  posts: Array<postType>
}
type DispatchPropsType = {
  addPost: (text: string) => void
}

const mapStateToProps = (state: AppStateType): MapPropsType => {
  return (
    {
      posts: state.profilePage.posts
    }
  )
}

const mapDispatchToProps = (dispatch: any): DispatchPropsType => {
  return (
    {
      addPost: (text) => {
        dispatch(actions.addPost(text))
      }
    }
  )
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)

export default PostsContainer;