import React, { useEffect, useMemo, useState } from "react";
import c from './Profile.module.css'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

import userPhoto from '../../../images/ava.png'
import Contact from "./Contact/Contact";
import ProfileEditForm from "./ProfileEditForm/ProfileEditForm";

const Profile = ({ profile, status, updateStatus, isOwner, updateAvatar, isAuth }) => {
    const [isEditMode, setIsEditMode] = useState(false)
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

    const onEditModeChange = () => {
        setIsEditMode(!isEditMode)
    }

    return (
        <>
            {/* <div className={c.profile__top_image} ></div> */}
            {(profile) &&
                !isEditMode ?
                <div className="profile__user">
                    <img src={avatarSrc} alt="avatar" />
                    {isOwner &&
                        <input type={"file"} onChange={onNewAvatarSelected} />}

                    <h1>{profile.fullName}</h1>
                    <ul>
                        {contactElements}
                    </ul>
                    <div>
                        <div>
                            <label>Looking for a job: </label>
                            <input readOnly placeholder={profile.lookingForAJob ? 'yes' : 'no'} />
                        </div>
                        {profile.lookingForAJobDescription &&
                            <div>
                                <input readOnly placeholder={profile.lookingForAJobDescription} />
                            </div>
                        }
                        {profile.aboutMe &&
                            <div>
                                <label>About me: </label>
                                <input readOnly placeholder={profile.aboutMe} />
                            </div>
                        }
                        {isOwner &&
                            <button onClick={onEditModeChange}>Изменить</button>}
                    </div>
                    <ProfileStatus text={status} updateStatus={updateStatus} />
                </div>
                :
                <ProfileEditForm profile={profile} avatarSrc={avatarSrc} onNewAvatarSelected={onNewAvatarSelected} />
            }
        </>
    )
}

export default React.memo(Profile);
