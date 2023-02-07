import axios from "axios";
import React, { useEffect } from "react";
import s from './Users.module.css';
import userPhoto from '../../images/ava.png'

let Users = ({ users, follow, setUsers }) => {

    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then((res) => {
                setUsers(res.data.items)
            })
    }, [])



    return (
        <div>
            {users.map(u => {
                return (
                    <div key={u.id}>
                        <div className={s.user__card}>
                            <img className={s.user__foto} src={u.photos.small != null ? u.photos.small : userPhoto} />
                            <button className={s.user__btnFollow} onClick={() => { follow(u.id) }}>
                                {u.followed ? 'unfollow' : 'follow'}
                            </button>
                            <h2 className={s.user__name}>{u.name}</h2>
                            <p className={`${s.user__status} ${s.user__text}`}>{u.status}</p>
                            <div className={s.user__location}>
                                <p className={s.user__text}>Russia</p>
                                <p className={s.user__text}>Moscow</p>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div >
    )
}

export default Users;