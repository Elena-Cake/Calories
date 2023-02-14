// чистая компонента

import React from "react";
import s from './Users.module.css';
import userPhoto from '../../images/ava.png'
import { NavLink } from "react-router-dom";
import axios from "axios";

let Users = ({ users, follow, totalUserCount, pageSize, currentPage, onChangePage, pageCount }) => {

    const handleFollow = (id, isFollowed) => {
        isFollowed ?
            (axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
                withCredentials: true,
                headers: {
                    'API-KEY': '4a9017e2-c35e-4760-9a40-6035439f2742'
                }
            })
                .then(res => {
                    if (res.data.resultCode === 0) {
                        follow(id)
                    }
                }))
            :
            (axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
                withCredentials: true,
                headers: {
                    'API-KEY': '4a9017e2-c35e-4760-9a40-6035439f2742'
                }
            })
                .then(res => {
                    if (res.data.resultCode === 0) {
                        follow(id)
                    }
                }))


    }

    const usersElements = users.map(u => {
        return (
            <div className={s.user__card} key={u.id}>
                <NavLink to={'/profile/' + u.id}>
                    <img className={s.user__foto} src={u.photos.small != null ? u.photos.small : userPhoto} />
                </NavLink>
                <button className={s.user__btnFollow} onClick={() => { handleFollow(u.id, u.followed) }}>
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