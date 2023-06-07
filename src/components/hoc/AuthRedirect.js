import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthUser } from "../../redux/authReduser";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const AuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to='/login' />
        return <Component {...props} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToProps, { checkAuthUser })(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}