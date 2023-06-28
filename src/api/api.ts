import axios from "axios"
import { photosType, profileType, userType } from "../types/types"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4a9017e2-c35e-4760-9a40-6035439f2742'
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type AuthCheckUserResType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type AuthLoginResType = {
    data: { userId: number }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type AuthLogoutResType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type AuthGetCaptchaResType = {
    url: string
}

type UsersGetUsersResType = {
    items: Array<userType>,
    totalCount: number,
    error: string | null
}

type UsersFollowResType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type ProfileStatusResType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type ProfileUpdateAvatarResType = {
    data: { photos: photosType }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type ProfileUpdateResType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const api = {
    // auth
    checkAuthUser() {
        return instance.get<AuthCheckUserResType>('auth/me')
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post<AuthLoginResType>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<AuthLogoutResType>('auth/login')
            .then(res => res.data)
    },
    getCaptchaUrl() {
        return instance.get<AuthGetCaptchaResType>('security/get-captcha-url')
            .then(res => res.data)
    },

    // Users
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersGetUsersResType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },

    follow(id: number) {
        return instance.post<UsersFollowResType>(`follow/${id}`, {})
            .then(res => res.data)
    },

    unfollow(id: number) {
        return instance.delete<UsersFollowResType>(`follow/${id}`)
            .then(res => res.data)
    },

    // Profile
    getProfile(profileId: number) {
        return instance.get<profileType>(`profile/${profileId}`)
            .then(res => res.data)
    },

    getStatus(profileId: number) {
        return instance.get<string>(`profile/status/${profileId}`)
            .then(res => res.data)
    },

    updateStatus(status: string) {
        return instance.put<ProfileStatusResType>(`profile/status`, { status })
            .then(res => res.data)
    },

    updateAvatar(foto: any) {
        const formData = new FormData();
        formData.append('image', foto)
        return instance.put<ProfileUpdateAvatarResType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
    },

    updateProfile(profile: profileType) {
        return instance.put<ProfileUpdateResType>(`profile`, profile)
            .then(res => res.data)
    },
}
