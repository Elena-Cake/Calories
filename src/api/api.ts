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

type GetItemsType<T> = {
    items: Array<T>,
    totalCount: number,
    error: string | null
}

type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

type AuthCheckUserDataType = {
    id: number,
    email: string,
    login: string
}
type ProfileUpdateAvatarDataType = { photos: photosType }
type AuthLoginDataType = { userId: number }
type AuthGetCaptchaResType = { url: string }


export const api = {
    // auth
    checkAuthUser() {
        return instance.get<ResponseType<AuthCheckUserDataType>>('auth/me')
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post<ResponseType<AuthLoginDataType, ResultCodeEnum | ResultCodeForCaptcha>>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
            .then(res => res.data)
    },
    getCaptchaUrl() {
        return instance.get<AuthGetCaptchaResType>('security/get-captcha-url')
            .then(res => res.data)
    },

    // Users
    getUsers(currentPage: number, pageSize: number, term = '', friend = null as null | boolean) {
        return instance.get<GetItemsType<userType>>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },

    follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`, {})
            .then(res => res.data)
    },

    unfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
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
        return instance.put<ResponseType>(`profile/status`, { status })
            .then(res => res.data)
    },

    updateAvatar(foto: any) {
        const formData = new FormData();
        formData.append('image', foto)
        return instance.put<ResponseType<ProfileUpdateAvatarDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
    },

    updateProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile`, profile)
            .then(res => res.data)
    },
}
