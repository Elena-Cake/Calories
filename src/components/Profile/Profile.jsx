import React from "react";
import Posts from "./Posts/Posts";
import c from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ state , dispatch}) => {
    return (
        <div>
            <ProfileInfo />
            <Posts posts={state.posts} dispatch={dispatch}/>
        </div>
    )
}

export default Profile;