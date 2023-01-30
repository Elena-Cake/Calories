const ADD_POST = 'ADD-POST';
const ADD_MESSAGE = 'ADD_MESSAGE';

let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photo.png',
                    text: 'кушаю',
                    likes: 3
                }
                ,
                {
                    avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg',
                    text: 'худею',
                    likes: 33
                }
            ]
        },
        dialogsPage: {
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
    },
    _callSubscriber() {
        console.log('_callSubscriber')
    },
    getState() {
        return this._state
    },
    subcribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) { // {type: 'ADD-POST'}
        if (action.type === ADD_POST ) {
            let newPost = {
                avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg', 
                text: action.postMessage,
                likes: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._callSubscriber(this._state);
        } else if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 7,
                message: action.textMessage
            }
            this._state.dialogsPage.messagesData.push(newMessage);
            this._callSubscriber(this._state);
        } else {
            console.log('dispatch error')
        }
    }
}

export const addPospActionCreator = (text) => {
    return {
        type: ADD_POST,
        postMessage: text
    }
}

export const addNewMessageElement = (text) => {
    return {
        type: ADD_MESSAGE,
        textMessage: text
    }
}

export default store;