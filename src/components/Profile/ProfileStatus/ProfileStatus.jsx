import React, { useEffect, useRef, useState } from "react";
import c from './ProfileStatus.module.scss'

const ProfileStatus = ({ text, updateStatus, isOwner }) => {

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
            {!isOwner ?
                <span className={c.status__text} onClick={activateEditMode}>{text || "статус шредингера"}</span>
                :
                !editMode ?
                    <div className={c.status__show} onClick={activateEditMode}>
                        <span className={c.status__text} >{text || "статус шредингера"}</span>
                        <div className={c.status__pen}> </div>
                    </div> :
                    <textarea className={c.status__edit} value={status} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus />
            }
        </div>
    )
}

export default ProfileStatus;