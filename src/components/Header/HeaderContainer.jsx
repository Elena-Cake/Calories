import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { api } from "../../api/api";
import { setAuthUserData } from "../../redux/authReduser";
import Header from "./Header";

const HeaderContainer = (props) => {
    useEffect(() => {
        api.checkAuthUser()
            .then(data => {
                if (data.resultCode === 0) {
                    let { userId, email, login } = data.data
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