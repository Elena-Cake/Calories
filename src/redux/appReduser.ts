import { checkAuthUser } from "./authReduser";

const INITIALISED_SUCCESS = 'calories/app/INITIALISED_SUCCESS'

export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}

const appReduser = (state = initialState, action: any): initialStateType => {
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

export type setInitiolizedSuccessActionType = {
    type: typeof INITIALISED_SUCCESS
}

export const setInitiolizedSuccess = (): setInitiolizedSuccessActionType => ({ type: INITIALISED_SUCCESS })


export const initializeApp = () => (dispatch: any) => {
    let getUserData = dispatch(checkAuthUser())
    Promise.all([getUserData])
        .then(() => {
            dispatch(setInitiolizedSuccess())
        })
}

export default appReduser;