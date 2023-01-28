const ADD_POST = 'ADD-POST';

const initialState = {
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
}

const profileReduser = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            state.posts.push({
                avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg',
                text: action.postMessage,
                likes: 0
            });
            return state
        default:
            return state
    }

}

export const addPospActionCreator = (text) => {
    return {
        type: ADD_POST,
        postMessage: text
    }
}

export default profileReduser;