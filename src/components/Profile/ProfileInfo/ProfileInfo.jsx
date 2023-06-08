import React, { useEffect, useMemo, useState } from "react";
import c from './ProfileInfo.module.css'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

import userPhoto from '../../../images/ava.png'
import Contact from "./Contact/Contact";

const Profile = ({ profile, status, updateStatus, isOwner, updateAvatar }) => {

    const avatarSrc = profile.photos.large || userPhoto

    const onNewAvatarSelected = (e) => {
        if (e.target.files.length) {
            updateAvatar(e.target.files[0])
        }
    }
    const contactElements = []
    for (let contact in profile.contacts) {
        contactElements.push(<Contact key={contact} contactLink={profile.contacts[contact]} contactName={contact} />)
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
                    <ul>
                        {contactElements}
                    </ul>
                    <div>
                        <p>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</p>
                        <p>{profile.lookingForAJobDescription}</p>
                    </div>
                    <ProfileStatus text={status} updateStatus={updateStatus} />
                </div>
            }
        </>
    )
}

export default React.memo(Profile);