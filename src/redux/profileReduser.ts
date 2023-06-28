import { api } from "../api/api";
import { photosType } from "../types/types";

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

type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}


type profileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
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

const profileReduser = (state = initialState, action: any): initialStateType => {

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

type addPostType = {
    type: typeof ADD_POST,
    postMessage: string
}

export const addPost = (text: string): addPostType => {
    return {
        type: ADD_POST,
        postMessage: text
    }
}

type deletePostType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost = (postId: number): deletePostType => {
    return {
        type: DELETE_POST,
        postId
    }
}

type setStatusType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): setStatusType => ({ type: SET_STATUS, status })

type setUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: profileType
}

export const setUserProfile = (profile: profileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile })

type setAvatarSuccessType = {
    type: typeof SET_AVATAR,
    photos: photosType
}

export const setAvatarSuccess = (photos: photosType): setAvatarSuccessType => ({ type: SET_AVATAR, photos: photos })

type setProfileSuccessType = {
    type: typeof SET_PROFILE,
    profile: profileType
}

export const setProfileSuccess = (profile: profileType): setProfileSuccessType => ({ type: SET_PROFILE, profile })

type setIsEditModeProfileOnType = {
    type: typeof SET_IS_EDIT_MODE_ON
}

export const setIsEditModeProfileOn = (): setIsEditModeProfileOnType => ({ type: SET_IS_EDIT_MODE_ON })

type setIsEditModeProfileOffType = {
    type: typeof SET_IS_EDIT_MODE_OFF
}

export const setIsEditModeProfileOff = (): setIsEditModeProfileOffType => ({ type: SET_IS_EDIT_MODE_OFF })

export const getUser = (profileId: number) => async (dispatch: any) => {
    let data = await api.getProfile(profileId);
    dispatch(setUserProfile(data))
}


export const getStatus = (profileId: number) => async (dispatch: any) => {
    let data = await api.getStatus(profileId)
    dispatch(setStatus(data))
}


export const updateStatus = (status: string) => async (dispatch: any) => {
    let res = await api.updateStatus(status);

    if (!res.resultCode) dispatch(setStatus(status))
    if (res.resultCode) console.warn('update fail')

}

export const updateAvatar = (file: any) => async (dispatch: any) => {
    let res = await api.updateAvatar(file);

    if (!res.resultCode) dispatch(setAvatarSuccess(res.data.photos))
    if (res.resultCode) console.warn('update fail')

}

export const updateProfile = (profile: profileType) => async (dispatch: any) => {
    console.log('updateProfile')
    let res = await api.updateProfile(profile);
    if (!res.resultCode) {
        dispatch(setProfileSuccess(profile))
        dispatch(setIsEditModeProfileOff())
    }
    if (res.resultCode) console.warn('update fail')

}

export default profileReduser;