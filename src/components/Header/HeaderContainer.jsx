import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/authReduser";
import Header from "./Header";

const HeaderContainer = (props) => {
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    let { userId, email, login } = res.data.data
                    props.setAuthUserData(userId, email, login)
                }
            })
    }, [])

    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);