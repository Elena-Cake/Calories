import React from "react";
import s from './Users.module.css'

let Users = ({users, follow, setUsers}) => {
    
    if (users.length === 0) {
        setUsers( [
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
               users.map( u =>{ 
               return(
                <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.user__foto} src={u.photoUrl}/>
                            <button onClick={() => {follow(u.id)}}>
                                {u.followed ? 'unfollow' : 'follow'}
                            </button>
                        </div>
                        <div>
                            <h2>{u.fullName}</h2>
                            <p>{u.status}</p>
                            <p>{u.location.country}</p>
                            <p>{u.location.city}</p>
                        </div>
                    </span>

                </div>
               )})
               }
            </div>
    )
}

export default Users;