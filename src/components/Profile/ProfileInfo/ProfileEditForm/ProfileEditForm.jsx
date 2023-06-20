import React from "react";
import c from './ProfileEditForm.module.css'

const ProfileEditForm = ({ profile, avatarSrc, onNewAvatarSelected }) => {
    const contactElements = []
    for (let contact in profile.contacts) {
        contactElements.push(
            <li key={contact} className={c.contact__item}>
                <label>{contact}</label>
                <input placeholder={profile.contacts.contact || ''} />
            </li>)
    }

    return (
        <form>
            <img src={avatarSrc} alt="avatar" />
            <input type={"file"} onChange={onNewAvatarSelected} />

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
                <button >Сохранить</button>
            </div>
        </form>
    )
}

export default ProfileEditForm;