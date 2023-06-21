// чистая компонента

import React from "react";
import s from './Users.module.scss';
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

let Users = ({ users, follow, unfollow, currentPage, onChangePage,
    followingInProgress, totalUserCount, pageSize }) => {
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
        <div className={s.users}>
            <Paginator currentPage={currentPage} onChangePage={onChangePage} totalUserCount={totalUserCount} pageSize={pageSize} />
            <div className={s.users__items}>
                {usersElements}
            </div>
        </div >
    )
}

export default Users;