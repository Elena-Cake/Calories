import { api } from "../api/api";

const SET_USER_DATA = 'calories/auth/SET_USER_DATA'

const initialState = {
    authorisedId: null,
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
                ...action.payload
            };

        default:
            return state
    }
}

export const setAuthUserData = (authorisedId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { authorisedId, email, login, isAuth } })

export const checkAuthUser = () => async (dispatch) => {
    let data = await api.checkAuthUser();
    if (data.resultCode === 0) {
        let { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }

}


export const loginMe = (email, pass, rememberMe) => async (dispatch) => {
    let data = await api.login(email, pass, rememberMe);
    if (data.resultCode === 0) {
        dispatch(checkAuthUser())
    }
}

export const logoutMe = () => async (dispatch) => {
    let data = await api.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReduser;