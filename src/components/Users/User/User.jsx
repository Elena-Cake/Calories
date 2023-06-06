import React from "react";
import s from './User.module.css'
import { NavLink } from "react-router-dom";

import userPhoto from '../../../images/ava.png'

const User = ({ user, handleFollow, followingInProgress }) => {
    console.log();
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
            <div className={s.user__location}>
                <p className={s.user__text}>Russia</p>
                <p className={s.user__text}>Moscow</p>
            </div>
        </div>
    )
}

export default User;
