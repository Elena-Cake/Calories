import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthUser } from "../../redux/authReduser";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const AuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        // componentDidMount(prevProps, prevState) {
        //     // debugger
        //     if (prevProps.isAuth !== this.props.isAuth) {
        //         this.setState({
        //             isAuth: this.props.isAuth
        //         })
        //     }
        // }
        render() {
            console.log(this.props.isAuth)
            if (!this.props.isAuth) return <Navigate to='/login' />
            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect(mapStateToProps, { checkAuthUser })(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}