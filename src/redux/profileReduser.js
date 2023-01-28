const ADD_POST = 'ADD-POST';

const profileReduser = (state, action) => {

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