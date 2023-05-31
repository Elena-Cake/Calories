import { api } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'

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
    profile: null,
    status: ''
}

const profileReduser = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    {
                        avatar: 'https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg',
                        text: action.postMessage,
                        likes: 0
                    },
                    ...state.posts
                ]
            };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_STATUS:
            return { ...state, status: action.status };

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
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const getUser = (profileId) => {
    return (dispatch) => {
        api.getProfile(profileId)
            .then((data) => {
                dispatch(setUserProfile(data))
            })
    }
}

export const getStatus = (profileId) => {
    return (dispatch) => {
        api.getStatus(profileId)
            .then((data) => {
                dispatch(setStatus(data))
            })
    }
}

export const updateStatus = (status) => (dispatch) => {
    console.log(1)
    api.updateStatus(status)
        .then((res) => {
            console.log(res)
            if (res.resultCode === 0) dispatch(setStatus(status))
            if (res.resultCode === 1) console.warn('update fail')
        })
}


export default profileReduser;