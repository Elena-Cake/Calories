import { api } from "../api/api";
import { photosType, profileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

const ADD_POST = 'calories/profile/ADD_POST';
const DELETE_POST = 'calories/profile/DELETE_POST';
const SET_USER_PROFILE = 'calories/profile/SET_USER_PROFILE';
const SET_STATUS = 'calories/profile/SET_STATUS';
const SET_AVATAR = 'calories/profile/SET_AVATAR';
const SET_PROFILE = 'calories/profile/SET_PROFILE';
const SET_IS_EDIT_MODE_ON = 'calories/profile/SET_IS_EDIT_MODE_ON';
const SET_IS_EDIT_MODE_OFF = 'calories/profile/SET_IS_EDIT_MODE_OFF';

type postType = {
    id: number,
    avatar: string,
    text: string,
    likes: number
}

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
    ] as Array<postType>,
    profile: { photos: { large: '', small: '' } } as profileType | null,
    status: '',
    isEditMode: false

}
export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const profileReduser = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    {
                        id: state.posts.length,
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
        case SET_AVATAR:
            return { ...state, profile: { ...state.profile, photos: action.photos } as profileType };
        case SET_PROFILE:
            return {
                ...state, profile: {
                    ...state.profile,
                    fullName: action.profile.fullName,
                    lookingForAJob: action.profile.lookingForAJob,
                    lookingForAJobDescription: action.profile.lookingForAJobDescription,
                    aboutMe: action.profile.aboutMe,
                    contacts: {
                        github: action.profile.contacts.github,
                        vk: action.profile.contacts.vk,
                        facebook: action.profile.contacts.facebook,
                        instagram: action.profile.contacts.instagram,
                        twitter: action.profile.contacts.twitter,
                        website: action.profile.contacts.website,
                        youtube: action.profile.contacts.youtube,
                        mainLink: action.profile.contacts.mainLink
                    }
                } as profileType
            };
        case SET_IS_EDIT_MODE_ON:
            return { ...state, isEditMode: true };
        case SET_IS_EDIT_MODE_OFF:
            return { ...state, isEditMode: false };

        default:
            return state
    }
}

export const actions = {
    addPost: (text: string) => ({ type: ADD_POST, postMessage: text } as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    setUserProfile: (profile: profileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setAvatarSuccess: (photos: photosType) => ({ type: SET_AVATAR, photos: photos } as const),
    setProfileSuccess: (profile: profileType) => ({ type: SET_PROFILE, profile } as const),
    setIsEditModeProfileOn: () => ({ type: SET_IS_EDIT_MODE_ON } as const),
    setIsEditModeProfileOff: () => ({ type: SET_IS_EDIT_MODE_OFF } as const)
}


export const getUser = (profileId: number): ThunkType => async (dispatch) => {
    let data = await api.getProfile(profileId);
    dispatch(actions.setUserProfile(data))
}


export const getStatus = (profileId: number): ThunkType => async (dispatch) => {
    let data = await api.getStatus(profileId)
    dispatch(actions.setStatus(data))
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let res = await api.updateStatus(status);

    if (!res.resultCode) dispatch(actions.setStatus(status))
    if (res.resultCode) console.warn('update fail')

}

export const updateAvatar = (file: any): ThunkType => async (dispatch) => {
    let res = await api.updateAvatar(file);

    if (!res.resultCode) dispatch(actions.setAvatarSuccess(res.data.photos))
    if (res.resultCode) console.warn('update fail')

}

export const updateProfile = (profile: profileType): ThunkType => async (dispatch) => {
    console.log('updateProfile')
    let res = await api.updateProfile(profile);
    if (!res.resultCode) {
        dispatch(actions.setProfileSuccess(profile))
        dispatch(actions.setIsEditModeProfileOff())
    }
    if (res.resultCode) console.warn('update fail')

}

export default profileReduser;