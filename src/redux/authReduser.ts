import { api } from "../api/api";

const SET_USER_DATA = 'calories/auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'calories/auth/SET_CAPTCHA_URL'
const DELETE_CAPTCHA_URL = 'calories/auth/DELETE_CAPTCHA_URL'

export type initialStateType = {
    authorisedId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetching: boolean,
    captchaUrl: string | null
}

const initialState: initialStateType = {
    authorisedId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
}

const authReduser = (state = initialState, action: any): initialStateType => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        case DELETE_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: null
            };

        default:
            return state
    }
}

type setAuthUserDataPayloadType = {
    authorisedId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataPayloadType
}

export const setAuthUserData = (authorisedId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType =>
    ({ type: SET_USER_DATA, payload: { authorisedId, email, login, isAuth } })

type setCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string
}

export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlType => ({ type: SET_CAPTCHA_URL, captchaUrl })

type deleteCaptchaUrlType = { type: typeof DELETE_CAPTCHA_URL }

export const deleteCaptchaUrl = (): deleteCaptchaUrlType => ({ type: DELETE_CAPTCHA_URL })


export const checkAuthUser = () => async (dispatch: any) => {
    let data = await api.checkAuthUser();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const loginMe = (email: string, pass: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await api.login(email, pass, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(checkAuthUser())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let data = await api.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url))
}

export const logoutMe = () => async (dispatch: any) => {
    let data = await api.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReduser;