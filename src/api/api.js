import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4a9017e2-c35e-4760-9a40-6035439f2742'
    }
})

export const api = {
    // auth
    checkAuthUser() {
        return instance.get('/auth/me')
            .then(res => res.data)
    },

    // Users
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },

    follow(id) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {})
            .then(res => res.data)
    },

    unfollow(id) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(res => res.data)
    }

    // Profile

}
