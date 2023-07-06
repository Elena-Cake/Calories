// чистая компонента

import React from "react";
import s from './Users.module.scss';
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import { userType } from "../../types/types";
import UsersSerchForm from "./UsersSerchForm/UsersSerchForm";
import { FiltersType } from "../../redux/usersReduser";

type propsType = {
    title: string
    currentPage: number
    onChangePage: (pageNumber: number) => void
    onChangeFilters: (filters: FiltersType) => void
    totalUserCount: number
    pageSize: number
    portionSize?: number
    users: Array<userType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

let Users: React.FC<propsType> = ({ users, follow, unfollow, currentPage, onChangePage, onChangeFilters,
    followingInProgress, totalUserCount, pageSize }) => {
    const handleFollow = (isFollowed: boolean, userId: number) => {
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
            <UsersSerchForm onChangeFilters={onChangeFilters} />
            <Paginator currentPage={currentPage} onChangePage={onChangePage} totalUserCount={totalUserCount} pageSize={pageSize} />
            <div className={s.users__items}>
                {usersElements}
            </div>
        </div >
    )
}

export default Users;