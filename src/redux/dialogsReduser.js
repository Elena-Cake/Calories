// СОХРАНЕНИЕ НАПЕЧАТАННОГО, НО ЕЩЕ НЕ ОТПРАВЛЕННОГО СООБЩЕНИЯ (тоже делалось и для поста)
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

const dialogsReduser = (state, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messagesData.push({ id: 7, message: body })
            return state
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