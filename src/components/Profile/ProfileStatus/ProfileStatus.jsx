import React, { useEffect, useRef, useState } from "react";
import c from './ProfileStatus.module.css'

const ProfileStatus = ({ text, updateStatus }) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(text);

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (e) => {
        setEditMode(false)
        updateStatus(e.target.value)
    }

    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        setStatus(text)
    }, [text])

    return (
        <div >
            {!editMode ?
                <span onClick={activateEditMode}>{text || "статус шредингера"}</span> :
                <input value={status} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus />
            }
        </div>
    )
}

export default ProfileStatus;