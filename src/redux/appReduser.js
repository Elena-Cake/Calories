import { api } from "../api/api";
import { checkAuthUser } from "./authReduser";

const INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

const initialState = {
    initialized: false
}

const appReduser = (state = initialState, action) => {
    switch (action.type) {

        case INITIALISED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}

export const setInitiolizedSuccess = () => ({ type: INITIALISED_SUCCESS })


export const initializeApp = () => (dispatch) => {
    let getUserData = dispatch(checkAuthUser())
    Promise.all([getUserData])
        .then(() => {
            dispatch(setInitiolizedSuccess())
        })
}

export default appReduser;