import React from "react";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo';

import ProfileForm from "./ProfileInfo/ProfileEditForm/ProfileEditForm";


const Profile = (props) => {
    return (
        <>
            {!props.isEditMode &&
                <div>
                    <ProfileInfo {...props} />
                    <PostsContainer />

                </div>}
            {props.isEditMode &&
                <div>
                    <ProfileForm />
                </div>
            }
        </>
    )
}

export default Profile;