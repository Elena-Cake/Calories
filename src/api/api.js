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
        return instance.get('auth/me')
            .then(res => res.data)
    },
    login(email, password, rememberMe = false, captcha) {
        return instance.post('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
            .then(res => res.data)
    },
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
            .then(res => res.data)
    },

    // Users
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },

    follow(id) {
        return instance.post(`follow/${id}`, {})
            .then(res => res.data)
    },

    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(res => res.data)
    },

    // Profile
    getProfile(profileId) {
        return instance.get(`profile/${profileId}`)
            .then(res => res.data)
    },

    getStatus(profileId) {
        return instance.get(`profile/status/${profileId}`)
            .then(res => res.data)
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status })
            .then(res => res.data)
    },

    updateAvatar(foto) {
        const formData = new FormData();
        formData.append('image', foto)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
    },

    updateProfile(profile) {
        return instance.put(`profile`, profile)
            .then(res => res.data)
    },
}
