
import React, { useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUser, getStatus, updateStatus, updateAvatar } from "../../redux/profileReduser";
import { compose } from "redux";

const ProfileContainer = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        let profileId = props.router.params.userId;
        if (!profileId) {
            if (!props.authorisedId) {
                navigate('/users')
            }
            profileId = props.authorisedId
        }
        props.getUser(profileId)
        props.getStatus(profileId)
    }, [])

    return (
        <div>
            <Profile isOwner={!props.router.params.userId}  {...props} />
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
    authorisedId: state.auth.authorisedId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, updateAvatar }),
    withRouter,
    // AuthRedirect
)(ProfileContainer)
