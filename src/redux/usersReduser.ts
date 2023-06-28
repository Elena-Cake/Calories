import axios from "axios"
import { api } from "../api/api"
import { updateObjectInArray } from "../utils/objects-helpers.js"
import { photosType } from "../types/types"

const FOLLOW = 'calories/user/FOLLOW'
const UNFOLLOW = 'calories/user/UNFOLLOW'
const SET_USERS = 'calories/user/SET_USERS'
const SET_CURRENT_PAGE = 'calories/user/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'calories/user/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'calories/user/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'calories/user/TOGGLE_IS_FOLLOWING_PROGRESS'


type userType = {
    name: string
    id: number
    uniqueUrlName: string | null
    status: string | null
    followed: boolean
    photos: photosType
}

const initialState = {
    users: [] as Array<userType>,
    pageSize: 8,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids
}

type initialStateType = typeof initialState

const usersReduser = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: false })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUserCount: action.totalUserCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

type followSucsessType = { type: typeof FOLLOW, userId: number }
export const followSucsess = (userId: number): followSucsessType => ({ type: FOLLOW, userId })

type unfollowSucsessType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSucsess = (userId: number): unfollowSucsessType => ({ type: UNFOLLOW, userId })

type setUsersType = { type: typeof SET_USERS, users: Array<userType> }
export const setUsers = (users: Array<userType>): setUsersType => ({ type: SET_USERS, users })

type setCurrPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrPage = (currentPage: number): setCurrPageType => ({ type: SET_CURRENT_PAGE, currentPage })

type setTotalUserCountType = { type: typeof SET_TOTAL_USERS_COUNT, totalUserCount: number }
export const setTotalUserCount = (totalUserCount: number): setTotalUserCountType => ({ type: SET_TOTAL_USERS_COUNT, totalUserCount })

type toggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type toggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

//getUsersThunkCreator
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let res = await api.getUsers(currentPage, pageSize);
    dispatch(setUsers(res.items))
    dispatch(setTotalUserCount(res.totalCount))

    dispatch(toggleIsFetching(false))
}


const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionType: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionType(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}

//followThunkCreator
export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, api.follow.bind(api), followSucsess)
}


//unfollowThunkCreator
export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, api.unfollow.bind(api), unfollowSucsess)
    }
}

export default usersReduser;