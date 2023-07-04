
import React, { useEffect, useState } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUser, getStatus, updateStatus, updateAvatar, actions } from "../../redux/profileReduser";
import { compose } from "redux";

const ProfileContainer = (props) => {
    const [profileId, setProfileId] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {

        console.log(props.router.params.userId, profileId);
        if (props.router.params.userId !== profileId) {
            let profileId
            if (!props.router.params.userId) {
                if (!props.authorisedId) {
                    navigate('/users')
                }
                setProfileId(props.authorisedId)
                profileId = props.authorisedId
            } else {

                setProfileId(props.router.params.userId)
                profileId = props.router.params.userId
            }
            props.getUser(profileId)
            props.getStatus(profileId)
        }
    }, [props.router.params.userId])

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
    isAuth: state.auth.isAuth,
    isEditMode: state.profilePage.isEditMode
})


export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, updateAvatar, setIsEditModeProfileOn: actions.setIsEditModeProfileOn }),
    withRouter,
    // AuthRedirect
)(ProfileContainer)
