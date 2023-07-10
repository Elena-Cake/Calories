// контейнернаяя компонента для общения с store и API

import React from "react";
import { useSelector } from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";

type propsType = { title?: string }

// контейнернаяя компонента для общения с API
const UsersContainer: React.FC<propsType> = ({ title }) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            <Preloader isFetching={isFetching} />
            <Users title={title} />
        </>
    )
}
export default UsersContainer;


