// контейнернаяя компонента для общения с store и API

import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getUsers } from "../../redux/usersReduser";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";
import { getCurrentPage, getIsFetching, getPageSize } from "../../redux/users-selectors";

type ownPropsType = {
    title: string
}
type mapStateToPropsType = {}
type mapDispatchToPropsType = {}

type propsType = ownPropsType & mapStateToPropsType & mapDispatchToPropsType

// контейнернаяя компонента для общения с API
let UsersAPIComponent: React.FC<propsType> = ({
    title
}) => {

    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)

    const isFetching = useSelector(getIsFetching)

    useEffect(() => {
        getUsers(currentPage, pageSize)
    }, [])

    return (
        <>
            <Preloader isFetching={isFetching} />
            <Users title={title} />
        </>
    )
}


// контейнернаяя компонента для общения с store
let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {}
}

export default compose<React.ComponentType>(
    connect
        (mapStateToProps, {})
)(UsersAPIComponent)

