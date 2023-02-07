import React from "react";
import { connect } from "react-redux";
import { followAC, setUsersAC, setCurrPageAC, setTotalUserCountAC } from "../../redux/usersReduser";
import Users from "./Users";

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

export default connect(mapStateToProps, mapDispatchToProps)(Users);