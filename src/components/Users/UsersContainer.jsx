// контейнернаяя компонента для общения с store и API

import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { follow, setUsers, setCurrPage, setTotalUserCount, toggleIsFetching, toggleFollowingProgress } from "../../redux/usersReduser";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import { api } from "../../api/api";



// контейнернаяя компонента для общения с API
let UsersAPIComponent = ({ users, follow, setUsers, setCurrPage,
    setTotalUserCount, pageSize, totalUserCount,
    currentPage, isFetching, toggleIsFetching, toggleFollowingProgress, followingInProgress }) => {

    const pageCount = Math.ceil(totalUserCount / pageSize)

    const onChangePage = (pageNumber) => {
        toggleIsFetching(true)
        setCurrPage(pageNumber)
        api.getUsers(currentPage, pageSize)
            .then((data) => {
                setUsers(data.items)
            })
            .then(() => toggleIsFetching(false))
    }

    useEffect(() => {
        toggleIsFetching(true)
        api.getUsers(currentPage, pageSize)
            .then((data) => {
                setUsers(data.items)
                setTotalUserCount(data.totalCount)
            })
            .then(() => toggleIsFetching(false))
    }, [])

    return (
        <>
            <Preloader isFetching={isFetching} />
            <Users
                users={users}
                follow={follow}
                totalUserCount={totalUserCount}

                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
                pageCount={pageCount}
                toggleFollowingProgress={toggleFollowingProgress}
                followingInProgress={followingInProgress} />
        </>
    )
}


// контейнернаяя компонента для общения с store
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps,
    { follow, setUsers, setCurrPage, setTotalUserCount, toggleIsFetching, toggleFollowingProgress }
)(UsersAPIComponent);