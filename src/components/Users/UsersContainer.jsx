// контейнернаяя компонента для общения с store и API

import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { followAC, setUsersAC, setCurrPageAC, setTotalUserCountAC } from "../../redux/usersReduser";
import Users from "./Users";

// контейнернаяя компонента для общения с API
let UsersAPIComponent = ({ users, follow, setUsers, setCurrPageAC, setTotalUserCountAC, pageSize, totalUserCount, currentPage }) => {

    const pageCount = Math.ceil(totalUserCount / pageSize)

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
        <Users
            users={users}
            follow={follow}
            totalUserCount={totalUserCount}

            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={onChangePage}
            pageCount={pageCount} />
    )
}


// контейнернаяя компонента для общения с store
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrPageAC: (currentPage) => {
            dispatch(setCurrPageAC(currentPage))
        },
        setTotalUserCountAC: (totalUserCount) => {
            dispatch(setTotalUserCountAC(totalUserCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);