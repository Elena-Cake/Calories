// чистая компонента

import React, { useEffect } from "react";
import s from './Users.module.scss';
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import UsersSerchForm from "./UsersSerchForm/UsersSerchForm";
import { follow, unfollow, FiltersType, getUsers } from "../../redux/usersReduser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersInfo, getCurrentPage, getFilters, getFollowingInProgress, getPageSize, getUsersTotalCount } from "../../redux/users-selectors";
import { TypedDispatch } from "../../redux/reduxStore";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

type propsType = {
    title?: string
}

const Users: React.FC<propsType> = () => {

    const users = useSelector(getAllUsersInfo)
    const totalUserCount = useSelector(getUsersTotalCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filters = useSelector(getFilters)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<TypedDispatch>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const onChangePage = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filters))
    }

    const onChangeFilters = (filters: FiltersType) => {
        dispatch(getUsers(1, pageSize, filters))
    }

    const dispatchFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const dispatchUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const handleFollow = (isFollowed: boolean, userId: number) => {
        isFollowed ?
            dispatchUnfollow(userId)
            :
            dispatchFollow(userId);
    }

    const usersElements = users.map(u => {
        return (
            <User key={u.id} user={u} handleFollow={handleFollow} followingInProgress={followingInProgress} />
        )
    })



    useEffect(() => {
        let actualPage = currentPage
        const actualFilters = filters

        if (searchParams.get('friends')) actualFilters.friend =
            searchParams.get('friends') === 'null' ? null :
                searchParams.get('friends') === 'true' ? true : false
        if (searchParams.get('term')) actualFilters.term = String(searchParams.get('term'))
        if (searchParams.get('page')) actualPage = Number(searchParams.get('page'))

        dispatch(getUsers(actualPage, pageSize, actualFilters))
    }, [])

    useEffect(() => {
        navigate(`/users?term=${filters.term}&friends=${filters.friend}&page=${currentPage}`)
    }, [filters, currentPage])

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