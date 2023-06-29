// контейнернаяя компонента для общения с store и API

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { follow, unfollow, actions, getUsers } from "../../redux/usersReduser";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { userType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type ownPropsType = {
    title: string
}
type mapStateToPropsType = {
    currentPage: number
    totalUserCount: number
    pageSize: number
    portionSize?: number
    users: Array<userType>
    followingInProgress: Array<number>
    isFetching: boolean
}
type mapDispatchToPropsType = {
    onChangePage: (pageNumber: number) => void
    getUsers: (pageNumber: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrPage: (pageNumber: number) => void
}

type propsType = ownPropsType & mapStateToPropsType & mapDispatchToPropsType

// контейнернаяя компонента для общения с API
let UsersAPIComponent: React.FC<propsType> = ({
    users, follow, unfollow, title,
    setCurrPage, pageSize, totalUserCount,
    currentPage, isFetching, getUsers,
    followingInProgress }) => {


    const onChangePage = (pageNumber: number) => {
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
                title={title}
                users={users}
                follow={follow}
                unfollow={unfollow}
                totalUserCount={totalUserCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
                followingInProgress={followingInProgress} />
        </>
    )
}


// контейнернаяя компонента для общения с store
let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<propsType>(
    connect
        (mapStateToProps, { follow, unfollow, setCurrPage: actions.setCurrPage, getUsers })
)(UsersAPIComponent)

