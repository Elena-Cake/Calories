import React, { useState } from "react";
import s from './Avatar.module.scss'
import { NavLink } from "react-router-dom";

import userPhoto from '../../../images/ava.png'

type PropsType = {
    userId: number,
    photo: string | null
}

const Avatar: React.FC<PropsType> = ({ userId, photo }) => {

    return (
        <NavLink to={'/profile/' + userId}>
            <img className={s.user__foto} src={photo !== null ? photo : userPhoto} alt='user avatar' />
        </NavLink>
    )
}

export default Avatar;
