import axios from "axios";
import React, { useEffect } from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";
import { api } from "../../api/api";
import { getUser } from "../../redux/profileReduser";
import { AuthRedirect } from "../hoc/AuthRedirect";

const ProfileContainer = (props) => {
    console.log(props.router.params)
    let profileId = props.router.params.userId;
    if (!profileId) { profileId = 2 }

    useEffect(() => {
        props.getUser(profileId)
    }, [])

    return (
        <div>
            <Profile {...props} />
        </div>
    )
}

let withAuthRedirect = AuthRedirect(ProfileContainer)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default connect(mapStateToProps, { getUser })(withRouter(withAuthRedirect));