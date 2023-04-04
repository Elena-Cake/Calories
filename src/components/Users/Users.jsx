// чистая компонента

import React from "react";
import s from './Users.module.css';
import userPhoto from '../../images/ava.png'
import { NavLink } from "react-router-dom";
import { api } from "../../api/api";

let Users = ({ users, follow, unfollow, currentPage, onChangePage, pageCount,
    followingInProgress }) => {
    const handleFollow = (isFollowed, userId) => {
        isFollowed ?
            unfollow(userId)
            :
            follow(userId);


    }

    const usersElements = users.map(u => {
        return (
            <div className={s.user__card} key={u.id}>
                <NavLink to={'/profile/' + u.id}>
                    <img className={s.user__foto} src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
                </NavLink>
                <button disabled={followingInProgress.some(id => id === u.id)}
                    className={s.user__btnFollow}
                    onClick={() => { handleFollow(u.followed, u.id) }}>
                    {u.followed ? 'unfollow' : 'follow'}
                </button>
                <h2 className={s.user__name}>{u.name}</h2>
                <p className={`${s.user__status} ${s.user__text}`}>{u.status}</p>
                <div className={s.user__location}>
                    <p className={s.user__text}>Russia</p>
                    <p className={s.user__text}>Moscow</p>
                </div>
            </div>
        )
    })

    const pagesCounterEmpty = []
    for (let i = 1; i <= pageCount; i++) {
        pagesCounterEmpty.push(i)
    }

    const pagesElements = pagesCounterEmpty.slice(0, 10).map(i => {
        return (
            <div key={i} className={`${s.pagination__btn} ${currentPage === i && s.pagination__btn_type_active}`}
                onClick={(e) => onChangePage(i)}>
                {i}
            </div>
        )
    })


    return (
        <div>
            <div className={s.pagination}>
                {pagesElements}
            </div>
            <div className={s.users}>
                {usersElements}
            </div>
        </div >
    )
}

export default Users;