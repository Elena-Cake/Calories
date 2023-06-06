import { api } from "../api/api";

const ADD_POST = 'calories/profile/ADD_POST';
const DELETE_POST = 'calories/profile/DELETE_POST';
const SET_USER_PROFILE = 'calories/profile/SET_USER_PROFILE';
const SET_STATUS = 'calories/profile/SET_STATUS'

const initialState = {
    posts: [
        {
            id: 0,
            avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photo.png',
            text: 'кушаю',
            likes: 3
        }
        ,
        {
            id: 1,
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
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
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const setStatus = (status) => ({ type: SET_STATUS, status })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const getUser = (profileId) => async (dispatch) => {
    let data = await api.getProfile(profileId);
    dispatch(setUserProfile(data))
}


export const getStatus = (profileId) => async (dispatch) => {
    let data = await api.getStatus(profileId)
    dispatch(setStatus(data))
}


export const updateStatus = (status) => async (dispatch) => {
    let res = await api.updateStatus(status);

    if (!res.resultCode) dispatch(setStatus(status))
    if (res.resultCode) console.warn('update fail')

}


export default profileReduser;