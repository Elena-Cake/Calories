import React from "react";
import c from './Contact.module.css'

const Contact = ({ contactLink, contactName }) => {
    return (
        <li className={`${c.contact} ${contactLink ? c.contact_visible : ''}`}>
            <a href={contactLink}>{contactName}</a>
        </li>
    )
}

export default Contact;