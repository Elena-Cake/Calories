import React from "react";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = ({ profile, isAuth, status, updateStatus, isOwner, updateAvatar }) => {
    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                updateAvatar={updateAvatar} />
            <PostsContainer />
        </div>
    )
}

export default Profile;