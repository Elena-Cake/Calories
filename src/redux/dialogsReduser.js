// СОХРАНЕНИЕ НАПЕЧАТАННОГО, НО ЕЩЕ НЕ ОТПРАВЛЕННОГО СООБЩЕНИЯ (тоже делалось и для поста)
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
    dialogsData: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Lena' },
        { id: 3, name: 'Lisa' },
        { id: 4, name: 'Anna' },
        { id: 5, name: 'Boris' },
        { id: 6, name: 'Sveta' }
    ],
    messagesData: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'sova' },
        { id: 3, message: 'sovas' },
        { id: 4, message: 'js' },
        { id: 5, message: 'know' },
        { id: 6, message: 'yo' }
    ],
    newMessageBody: ""
}

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messagesData: [...state.messagesData, { id: 7, message: body }]
            };
        default:
            return state
    }
}


export const sendMessaeCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessaeBodyCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: text
    }
}

export default dialogsReduser;