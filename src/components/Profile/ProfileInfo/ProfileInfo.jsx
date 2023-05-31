import React from "react";
import c from './ProfileInfo.module.css'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

const Profile = ({ profile, status, updateStatus }) => {

    return (
        <>
            {/* <div className={c.profile__top_image} ></div> */}
            {(profile) &&
                <div className="profile__user">
                    <img src={profile.photos.large} />
                    <h1>{profile.fullName}</h1>
                    <ProfileStatus text={status} updateStatus={updateStatus} />
                </div>
            }
        </>
    )
}

export default Profile;