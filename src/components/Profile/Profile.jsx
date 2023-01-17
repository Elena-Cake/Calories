import React from "react";
import Posts from "./Posts/Posts";
import c from './Profile.module.css'


const Profile = () => {
    return (
        <div>
            <img className={c.profile__top_image} src='http://c.files.bbci.co.uk/9017/production/_105278863_gettyimages-855098134.jpg' />
            <Posts />
        </div>
    )
}

export default Profile;