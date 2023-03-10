const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';


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
    ],
    profile: null
}

const profileReduser = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg',
                        text: action.postMessage,
                        likes: 0
                    }
                ]
            };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        default:
            return state
    }

}

export const addPost = (text) => {
    return {
        type: ADD_POST,
        postMessage: text
    }
}

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })


export default profileReduser;