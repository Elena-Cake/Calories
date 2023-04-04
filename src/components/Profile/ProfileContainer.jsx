import axios from "axios";
import React, { useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReduser"

const ProfileContainer = (props) => {
    let profileId = props.router.params.userId;
    if (!profileId) { profileId = 2 }
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${profileId}`)
            .then((res) => {

                console.log(res)

                props.setUserProfile(res.data)
            })
    }, [])

    return (
        <div>
            <Profile {...props} />
        </div>
    )
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
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

export default connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainer));