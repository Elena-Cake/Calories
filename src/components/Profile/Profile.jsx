import React from "react";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ profile, isAuth, status, updateStatus }) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} />
            <PostsContainer />
        </div>
    )
}

export default Profile;