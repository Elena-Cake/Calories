import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { ResultCodeEnum, ResultCodeForCaptcha, api } from "../api/api";

const initialState = {
    authorisedId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null
}
export type initialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const authReduser = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {

        case 'CALORIES/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'CALORIES/AUTH/SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        case 'CALORIES/AUTH/DELETE_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: null
            };

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (authorisedId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'CALORIES/AUTH/SET_USER_DATA', payload: { authorisedId, email, login, isAuth } } as const),
    setCaptchaUrl: (captchaUrl: string) => ({ type: 'CALORIES/AUTH/SET_CAPTCHA_URL', captchaUrl } as const),
    deleteCaptchaUrl: () => ({ type: 'CALORIES/AUTH/DELETE_CAPTCHA_URL' } as const)
}

export const checkAuthUser = (): ThunkType => async (dispatch) => {
    let data = await api.checkAuthUser();
    if (data.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const loginMe = (email: string, pass: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    let data = await api.login(email, pass, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(checkAuthUser())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await api.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(data.url))
}

export const logoutMe = (): ThunkType => async (dispatch) => {
    let data = await api.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReduser;