import axios from "axios"
import { api } from "../api/api"
import { updateObjectInArray } from "../utils/objects-helpers.js"

const FOLLOW = 'calories/user/FOLLOW'
const UNFOLLOW = 'calories/user/UNFOLLOW'
const SET_USERS = 'calories/user/SET_USERS'
const SET_CURRENT_PAGE = 'calories/user/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'calories/user/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'calories/user/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'calories/user/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReduser = (state = initialState, action) => {
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

export const followSucsess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSucsess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUserCount = (totalUserCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUserCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

//getUsersThunkCreator
export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let res = await api.getUsers(currentPage, pageSize);
    dispatch(setUsers(res.items))
    dispatch(setTotalUserCount(res.totalCount))

    dispatch(toggleIsFetching(false))
}


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionType(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}

//followThunkCreator
export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, api.follow.bind(api), followSucsess)
}


//unfollowThunkCreator
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, api.unfollow.bind(api), unfollowSucsess)
    }
}

export default usersReduser;