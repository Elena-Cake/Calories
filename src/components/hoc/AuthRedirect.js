import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthUser } from "../../redux/authReduser";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const AuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        // const [isAuth, setIsAuth] = useState(props.isAuth)
        // useEffect(() => {
        //     if (isAuth !== props.isAuth) {
        //         setIsAuth(props.isAuth)
        //     }
        // }, [])
        console.log(props.isAuth)
        if (!props.isAuth) return <Navigate to='/login' />
        return <Component {...props} />

    }


    let ConnectedAuthRedirectComponent = connect(mapStateToProps, { checkAuthUser })(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}