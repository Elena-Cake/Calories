import React, { useState } from "react";
import s from './NotFound.module.scss'

const NotFound = () => {

    return (
        <div className={s.notfound}>
            <h1 className={caches.notfound_title}>404 NOT FOUND</h1>
        </div>
    )
}

export default NotFound;
