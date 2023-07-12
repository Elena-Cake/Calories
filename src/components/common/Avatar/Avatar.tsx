import React, { useState } from "react";
import s from './Avatar.module.scss'
import { NavLink } from "react-router-dom";

import userPhoto from '../../../images/ava.png'

type PropsType = {
    id: number,
    photo: string
}

const Avatar: React.FC<PropsType> = ({ id, photo }) => {

    return (
        <NavLink to={'/profile/' + id}>
            <img className={s.user__foto} src={photo !== null ? photo : userPhoto} alt='user avatar' />
        </NavLink>
    )
}

export default Avatar;
