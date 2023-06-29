import { InferActionsTypes } from "./reduxStore";

type dialogType = {
    id: number
    name: string
}
type messageType = {
    id: number
    message: string
}

const initialState = {
    dialogsData: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Lena' },
        { id: 3, name: 'Lisa' },
        { id: 4, name: 'Anna' },
        { id: 5, name: 'Boris' },
        { id: 6, name: 'Sveta' }
    ] as Array<dialogType>,
    messagesData: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'sova' },
        { id: 3, message: 'sovas' },
        { id: 4, message: 'js' },
        { id: 5, message: 'know' },
        { id: 6, message: 'yo' }
    ] as Array<messageType>
}

export type initialStateDialogsType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReduser = (state = initialState, action: ActionsType): initialStateDialogsType => {
    switch (action.type) {

        case 'calories/dialogs/SEND_MESSAGE':
            let body = action.message
            return {
                ...state,
                messagesData: [...state.messagesData, { id: state.messagesData.length + 1, message: body }]
            };
        default:
            return state
    }
}

export const actions = {
    sendMessageCreator: (message: string) => ({ type: 'calories/dialogs/SEND_MESSAGE', message: message } as const)
}

export default dialogsReduser;