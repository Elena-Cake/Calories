import React, { useEffect, useMemo, useRef, useState } from "react";
import c from './ProfileInfo.module.scss'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

import userPhoto from '../../../images/ava.png'
import Contact from "./Contact/Contact";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, updateAvatar, isAuth, isEditMode, setIsEditModeProfileOn }) => {
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

    const onEditModeActivate = () => {
        setIsEditModeProfileOn()
    }

    return (
        <>
            {(profile) &&
                <div className={c.profileInfo}>
                    <div className={`${c.profileInfo__avatar} ${c.avatar}`}>
                        {isOwner ?
                            <>
                                <label for="ava" className={c.avatar__labelImg}><img src={avatarSrc} alt="avatar" className={c.avatar__img} /></label>
                                <input id="ava" className={c.avatar__btnEdit} type="file" accept="image/*" onChange={onNewAvatarSelected} />
                            </>
                            :
                            <img src={avatarSrc} alt="avatar" className={c.avatar__img} />
                        }
                    </div>
                    <h1 className={c.profileInfo__name}>{profile.fullName}</h1>
                    <ul className={c.profileInfo__contacts}>
                        {contactElements}
                    </ul>
                    {profile.lookingForAJob &&
                        <div className={c.profileInfo__job}>
                            <label>Ищу работу! </label>
                            <p>{profile.lookingForAJobDescription} </p>
                        </div>
                    }
                    {profile.aboutMe &&
                        <div className={c.profileInfo__about}>
                            <label>About me: </label>
                            <p >{profile.aboutMe} </p>
                        </div>
                    }
                    {isOwner &&
                        <button className={c.profileInfo__btnEdit} onClick={onEditModeActivate}>Изменить</button>}
                    <div className={c.profileInfo__status}>
                        <ProfileStatus text={status} updateStatus={updateStatus} />
                    </div>

                </div >
            }
        </>
    )
}

export default React.memo(ProfileInfo);
