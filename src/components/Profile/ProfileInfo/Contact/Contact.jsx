import React from "react";
import c from './Contact.module.scss'

const Contact = ({ contactLink, contactName }) => {
    let classIcon
    switch (contactName) {
        case "facebook":
            classIcon = 'contact__icon_type_facebook'
            break
        case "website":
            classIcon = 'contact__icon_type_website'
            break
        case "vk":
            classIcon = 'contact__icon_type_vk'
            break
        case "twitter":
            classIcon = 'contact__icon_type_twitter'
            break
        case "instagram":
            classIcon = 'contact__icon_type_instagram'
            break
        case "youtube":
            classIcon = 'contact__icon_type_youtube'
            break
        case "github":
            classIcon = 'contact__icon_type_github'
            break
        case "mainLink":
            classIcon = 'contact__icon_type_mainLink'
            break
        default:
            classIcon = 'contact__icon_type_none'
            break
    }

    return (
        <li className={`${c.contact} ${contactLink ? c.contact_visible : ''}`}>
            <label for="link"><div className={`${c.contact__icon} ${c[classIcon]}`}></div></label>
            <a id="link" href={contactLink} className={c.contact__link}>{contactName}</a>
        </li >
    )
}

export default Contact;