import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logoutMe } from "../../redux/authReduser";
import Header from "./Header";
import { AppStateType } from "../../redux/reduxStore";

type mapStateToProps = {
    isAuth: boolean,
    login: string | null
}
type mapDispatchToProps = {
    logoutMe: () => void
}
type propsType = mapStateToProps & mapDispatchToProps

const HeaderContainer: React.FC<propsType> = (props) => {

    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state: AppStateType): mapStateToProps => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { logoutMe })(HeaderContainer);