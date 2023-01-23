import React from "react";
import Posts from "./Posts/Posts";
import c from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ state }) => {
    return (
        <div>
            <ProfileInfo />
            <Posts posts={state.posts} />
        </div>
    )
}

export default Profile;