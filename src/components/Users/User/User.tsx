import React from "react";
import s from './User.module.scss'
import { NavLink } from "react-router-dom";

import userPhoto from '../../../images/ava.png'
import { userType } from "../../../types/types";

type PropsType = {
    user: userType,
    handleFollow: (followed: boolean, id: number) => void,
    followingInProgress: Array<number>
}

const User: React.FC<PropsType> = ({ user, handleFollow, followingInProgress }) => {
    return (
        <div className={s.user__card}>
            <NavLink to={'/profile/' + user.id}>
                <img className={s.user__foto} src={user.photos.small !== null ? user.photos.small : userPhoto} alt="" />
            </NavLink>
            <button disabled={followingInProgress.some(id => id === user.id)}
                className={s.user__btnFollow}
                onClick={() => { handleFollow(user.followed, user.id) }}>
                {user.followed ? 'unfollow' : 'follow'}
            </button>
            <h2 className={s.user__name}>{user.name}</h2>
            <p className={`${s.user__status} ${s.user__text}`}>{user.status}</p>
        </div>
    )
}

export default User;
