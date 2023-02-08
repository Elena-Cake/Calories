import React from "react";
import Preloader from "../../Preloader/Preloader";
import c from './ProfileInfo.module.css'

const Profile = ({ profile }) => {

    if (!profile) {
        return <Preloader isFetching={true} />
    }

    return (
        <>
            <div className={c.profile__top_image} ></div>
            <div className="profile__user">
                <img src={profile.photos.large} />
                <h1>{profile.fullName}</h1>
                <h2>{profile.aboutMe}</h2>
            </div>
        </>
    )
}

export default Profile;