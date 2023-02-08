import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReduser"


const ProfileContainer = (props) => {

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${'27856'}`)
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);