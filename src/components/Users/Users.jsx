// чистая компонента

import React from "react";
import s from './Users.module.css';
import { NavLink } from "react-router-dom";
import { api } from "../../api/api";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

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
            <User key={u.id} user={u} handleFollow={handleFollow} followingInProgress={followingInProgress} />
        )
    })
    return (
        <div>
            <Paginator pageCount={pageCount} currentPage={currentPage} onChangePage={onChangePage} />
            <div className={s.users}>
                {usersElements}
            </div>
        </div >
    )
}

export default Users;