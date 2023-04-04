import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthUser } from "../../redux/authReduser";
import Header from "./Header";

const HeaderContainer = (props) => {
    useEffect(() => {
        props.checkAuthUser()
    }, [])

    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { checkAuthUser })(HeaderContainer);