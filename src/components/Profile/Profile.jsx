import React from "react";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ profile }) => {
    return (
        <div>
            <ProfileInfo profile={profile} />
            <PostsContainer />
        </div>
    )
}

export default Profile;