// контейнернаяя компонента для общения с store и API

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { follow, unfollow, setCurrPage, getUsers } from "../../redux/usersReduser";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";


// контейнернаяя компонента для общения с API
let UsersAPIComponent = ({ users, follow, unfollow,
    setCurrPage, pageSize, totalUserCount,
    currentPage, isFetching, getUsers,
    toggleFollowingProgress, followingInProgress }) => {

    const pageCount = Math.ceil(totalUserCount / pageSize)

    const onChangePage = (pageNumber) => {
        setCurrPage(pageNumber)
        getUsers(pageNumber, pageSize)
    }

    useEffect(() => {
        getUsers(currentPage, pageSize)
    }, [])

    return (
        <>
            <Preloader isFetching={isFetching} />
            <Users
                users={users}
                follow={follow}
                unfollow={unfollow}
                totalUserCount={totalUserCount}

                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
                pageCount={pageCount}
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

export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrPage, getUsers })
)(UsersAPIComponent)

