
import { Dispatch } from "redux"
import { chatApi } from "../api/chatApi"
import { ChatMessageType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"

export type statusType = 'pending' | 'ready'

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as statusType
}

export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const chatReduser = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {

        case 'CALORIES/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        case 'CALORIES/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'CALORIES/CHAT/MESSAGES_RECEIVED',
        payload: { messages }
    } as const),
    statusChanged: (status: statusType) => ({
        type: 'CALORIES/CHAT/STATUS_CHANGED',
        payload: { status }
    } as const)
}

let _newMessageHendler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHendlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHendler === null) {
        _newMessageHendler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHendler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe(newMessageHendlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.stop()
    chatApi.unsubscribe(newMessageHendlerCreator(dispatch))
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReduser;