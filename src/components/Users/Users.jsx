import React from "react";
import s from './Users.module.css'

let Users = ({ users, follow, setUsers }) => {

    if (users.length === 0) {
        setUsers([
            {
                id: 1, followed: true, photoUrl: 'https://img.freepik.com/premium-vector/young-man-avatar-character_24877-36968.jpg',
                fullName: 'Dmitry', status: 'main', location: { city: 'Moscow', country: 'Russia' }
            },
            {
                id: 2, followed: true, photoUrl: 'https://png.pngtree.com/png-clipart/20191022/ourmid/pngtree-blink-woman-avatar-png-image_1842606.jpg',
                fullName: 'Lena', status: 'off', location: { city: 'Moscow', country: 'Russia' }
            },
            {
                id: 3, followed: false, photoUrl: 'https://avatars.mds.yandex.net/i?id=6ced0bbdf7bff5eaa42986a199bea0e4eedd9a10-5877286-images-thumbs&n=13',
                fullName: 'Alla', status: 'online', location: { city: 'Noginsk', country: 'Russia' }
            }
        ]
        )
    }

    return (
        <div>
            {
                users.map(u => {
                    return (
                        <div key={u.id}>
                            <div className={s.user__card}>
                                <img className={s.user__foto} src={u.photoUrl} />
                                <button className={s.user__btnFollow} onClick={() => { follow(u.id) }}>
                                    {u.followed ? 'unfollow' : 'follow'}
                                </button>
                                <h2 className={s.user__name}>{u.fullName}</h2>
                                <p className={`${s.user__status} ${s.user__text}`}>{u.status}</p>
                                <div className={s.user__location}>
                                    <p className={s.user__text}>{u.location.country}</p>
                                    <p className={s.user__text}>{u.location.city}</p>
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