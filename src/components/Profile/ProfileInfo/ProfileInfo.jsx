import React, { useEffect, useMemo, useState } from "react";
import c from './ProfileInfo.module.css'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

import userPhoto from '../../../images/ava.png'

const Profile = ({ profile, status, updateStatus, isOwner, updateAvatar }) => {

    const avatarSrc = profile.photos.large || userPhoto

    const onNewAvatarSelected = (e) => {
        if (e.target.files.length) {
            updateAvatar(e.target.files[0])
        }
    }

    return (
        <>
            {/* <div className={c.profile__top_image} ></div> */}
            {(profile) &&
                <div className="profile__user">
                    <img src={avatarSrc} alt="avatar" />
                    {isOwner &&
                        <input type={"file"} onChange={onNewAvatarSelected} />}
                    <h1>{profile.fullName}</h1>
                    <ProfileStatus text={status} updateStatus={updateStatus} />
                </div>
            }
        </>
    )
}

export default React.memo(Profile);