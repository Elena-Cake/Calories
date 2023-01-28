import React from "react";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ state , dispatch}) => {
    return (
        <div>
            <ProfileInfo />
            <PostsContainer posts={state.posts} dispatch={dispatch}/>
        </div>
    )
}

export default Profile;