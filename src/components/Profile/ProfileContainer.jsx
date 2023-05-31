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
import { getUser, getStatus, updateStatus } from "../../redux/profileReduser";
import { AuthRedirect } from "../hoc/AuthRedirect";
import { compose } from "redux";

const ProfileContainer = (props) => {

    let profileId = props.router.params.userId;
    if (!profileId) { profileId = 27953 }

    useEffect(() => {
        props.getUser(profileId)
        props.getStatus(profileId)
    }, [])

    return (
        <div>
            <Profile {...props} />
        </div>
    )
}

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

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus }),
    withRouter,
    // AuthRedirect
)(ProfileContainer)
