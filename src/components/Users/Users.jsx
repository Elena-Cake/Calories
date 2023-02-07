import axios from "axios";
import React, { useEffect } from "react";
import s from './Users.module.css';
import userPhoto from '../../images/ava.png'

let Users = ({ users, follow, setUsers, setCurrPageAC, setTotalUserCountAC, pageSize, totalUserCount, currentPage }) => {

    const usersElements = users.map(u => {
        return (
            <div className={s.user__card} key={u.id}>
                <img className={s.user__foto} src={u.photos.small != null ? u.photos.small : userPhoto} />
                <button className={s.user__btnFollow} onClick={() => { follow(u.id) }}>
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

    const pages = []
    for (let i = 1; i <= Math.ceil(totalUserCount / pageSize); i++) {
        pages.push(i)
    }

    const pagesElements = pages.map(i => {
        return (
            <div key={i} className={`${s.pagination__btn} ${currentPage === i && s.pagination__btn_type_active}`}
                onClick={(e) => onChangePage(i)}>
                {i}
            </div>
        )
    })

    const onChangePage = (pageNumber) => {
        setCurrPageAC(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`)
            .then((res) => {
                setUsers(res.data.items)
            })
    }

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then((res) => {
                setUsers(res.data.items)
                setTotalUserCountAC(res.data.totalCount)
            })
    }, [])

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