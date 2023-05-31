import { api } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
}

const authReduser = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            };

        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const checkAuthUser = () => {
    return (dispatch) => {
        api.checkAuthUser()
            .then(data => {
                if (data.resultCode === 0) {
                    let { userId, email, login } = data.data
                    dispatch(setAuthUserData(userId, email, login, true))
                }
            })
    }
}

export const loginMe = (email, pass, rememberMe) => (dispatch) => {
    api.login(email, pass, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(checkAuthUser())
            }
        })
}

export const logoutMe = () => (dispatch) => {
    api.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReduser;