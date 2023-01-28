import profileReduser from "./profileReduser";
import dialogsReduser from "./dialogsReduser";


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
            ],
            newMessageBody: ""
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

        this._state.profilePage = profileReduser(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);

        this._callSubscriber(this._state);

    }
}

export default store;