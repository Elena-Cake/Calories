import { checkAuthUser } from "./authReduser"
import { InferActionsTypes } from "./reduxStore"

const initialState = {
    initialized: false
}

export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const appReduser = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {

        case 'CALORIES/APP/INITIALISED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}

export const actions = {
    setInitiolizedSuccess: () => ({ type: 'CALORIES/APP/INITIALISED_SUCCESS' } as const)
}

export const initializeApp = () => (dispatch: any) => {
    let getUserData = dispatch(checkAuthUser())
    Promise.all([getUserData])
        .then(() => {
            dispatch(actions.setInitiolizedSuccess())
        })
}

export default appReduser;