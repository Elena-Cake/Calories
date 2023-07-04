import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthUser } from "../../redux/authReduser";
import { AppStateType } from "../../redux/reduxStore";

let mapStateToProps = (state: AppStateType): mapPropsType => ({
    isAuth: state.auth.isAuth
})
type mapPropsType = {
    isAuth: boolean
}

export function AuthRedirect<WCP extends object>(Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<mapPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Navigate to='/login' />
        return <Component {...restProps as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<mapPropsType, {}, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}