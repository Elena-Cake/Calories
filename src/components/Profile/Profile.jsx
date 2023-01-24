import React from "react";
import Posts from "./Posts/Posts";
import c from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ state , addPost}) => {
    return (
        <div>
            <ProfileInfo />
            <Posts posts={state.posts} addPost={addPost}/>
        </div>
    )
}

export default Profile;