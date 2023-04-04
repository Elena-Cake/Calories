import React from "react";
import Preloader from "../../Preloader/Preloader";
import c from './ProfileInfo.module.css'

const Profile = ({ profile }) => {

    return (
        <>
            <div className={c.profile__top_image} ></div>
            {(profile) &&
                <div className="profile__user">
                    <img src={profile.photos.large} />
                    <h1>{profile.fullName}</h1>
                    <h2>{profile.aboutMe}</h2>
                </div>
            }
        </>
    )
}

export default Profile;