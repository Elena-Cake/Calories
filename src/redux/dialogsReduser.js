

const SEND_MESSAGE = 'calories/dialogs/SEND_MESSAGE';

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
    ]
}

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.message
            return {
                ...state,
                messagesData: [...state.messagesData, { id: state.messagesData.length + 1, message: body }]
            };
        default:
            return state
    }
}


export const sendMessageCreator = (message) => ({ type: SEND_MESSAGE, message: message })


export default dialogsReduser;