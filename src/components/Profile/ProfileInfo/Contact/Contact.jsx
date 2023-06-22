import React from "react";
import c from './Contact.module.scss'

const Contact = ({ contactLink, contactName }) => {

    return (
        <li className={`${c.contact} ${contactLink ? c.contact_visible : ''}`}>
            <a href={contactLink} className={c.contact__link}>
                {contactName === "youtube" && <div className={`${c.contact__icon} ${c.contact__icon_type_youtube}`}></div>}
                {contactName === "facebook" && <div className={`${c.contact__icon} ${c.contact__icon_type_facebook}`}></div>}
                {contactName === "website" && <div className={`${c.contact__icon} ${c.contact__icon_type_website}`}></div>}
                {contactName === "instagram" && <div className={`${c.contact__icon} ${c.contact__icon_type_instagram}`}></div>}
                {contactName === "vk" && <div className={`${c.contact__icon} ${c.contact__icon_type_vk}`}></div>}
                {contactName === "twitter" && <div className={`${c.contact__icon} ${c.contact__icon_type_twitter}`}></div>}
                {contactName === "github" && <div className={`${c.contact__icon} ${c.contact__icon_type_github}`}></div>}
                {contactName === "mainLink" && <div className={`${c.contact__icon} ${c.contact__icon_type_mainLink}`}></div>}
            </a>
        </li >
    )
}

export default Contact;