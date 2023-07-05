
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUser, getStatus, updateStatus, updateAvatar, actions } from "../../redux/profileReduser";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";
import { WithRouter, WithRouterProps } from "../hoc/WithRouter";

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getUser: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (text: string) => void
    updateAvatar: (file: File) => void
    setIsEditModeProfileOn: () => void
}

const ProfileContainer: React.FC<MapPropsType & DispatchPropsType & WithRouterProps> = (props) => {
    const [profileId, setProfileId] = useState(null as number | null)
    const navigate = useNavigate()
    useEffect(() => {
        if (props.params.userId !== profileId) {
            let profileId: number | null = null
            if (!props.params.userId) {
                if (!props.authorisedId) {
                    navigate('/users')
                } else {
                    setProfileId(props.authorisedId)
                    profileId = props.authorisedId
                }
            } else {

                setProfileId(props.params.userId)
                profileId = props.params.userId
            }
            props.getUser(profileId as number)
            props.getStatus(profileId as number)
        }
    }, [props.params.userId])

    return (
        <div>
            <Profile isOwner={!props.params.userId}  {...props} />
        </div>
    )
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedId: state.auth.authorisedId,
    isAuth: state.auth.isAuth,
    isEditMode: state.profilePage.isEditMode
})


export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, updateAvatar, setIsEditModeProfileOn: actions.setIsEditModeProfileOn }),
    WithRouter,
    // AuthRedirect
)(ProfileContainer)
