import React, { useEffect, useMemo, useState } from "react";
import c from './ProfileInfo.module.scss'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

import userPhoto from '../../../images/ava.png'
import Contact from "./Contact/Contact";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, updateAvatar, isAuth, isEditMode, setIsEditModeProfileOn }) => {
    // const [isEditMode, setIsEditMode] = useState(false)
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
                    <div className={c.profileInfo__avatar}>
                        <img src={avatarSrc} alt="avatar" className={c.profileInfo__avatarImg} />
                        {isOwner &&
                            <input type="file" accept="image/*" onChange={onNewAvatarSelected} className={c.profileInfo__avatar_btn_edit} />
                        }
                    </div>

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
                            <button onClick={onEditModeActivate}>Изменить</button>}
                    </div>
                    <ProfileStatus text={status} updateStatus={updateStatus} />
                </div>
            }
        </>
    )
}

export default React.memo(ProfileInfo);
