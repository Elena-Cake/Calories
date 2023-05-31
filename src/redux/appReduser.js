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
    let checkUser = dispatch(checkAuthUser())
    Promise.all([checkUser])
        .then(() => {
            dispatch(setInitiolizedSuccess())
        })
}

export default appReduser;