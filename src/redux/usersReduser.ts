import axios from "axios"
import { api } from "../api/api"
import { updateObjectInArray } from "../utils/objects-helpers.js"
import { photosType, userType } from "../types/types"
import { number } from "yup"
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore"
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"

const FOLLOW = 'calories/user/FOLLOW'
const UNFOLLOW = 'calories/user/UNFOLLOW'
const SET_USERS = 'calories/user/SET_USERS'
const SET_CURRENT_PAGE = 'calories/user/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'calories/user/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'calories/user/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'calories/user/TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<userType>,
    pageSize: 8,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids
}
type initialStateType = typeof initialState

const usersReduser = (state = initialState, action: ActionsType): initialStateType => {
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
type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSucsess: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowSucsess: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsers: (users: Array<userType>) => ({ type: SET_USERS, users } as const),
    setCurrPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
    setTotalUserCount: (totalUserCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUserCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const)
}


type ThuncType = BaseThunkType<ActionsType>
//getUsersThunkCreator
export const getUsers = (currentPage: number, pageSize: number)
    : ThuncType => {
    // return async (dispatch: Dispatch<ActionsType>, getState: () => AppStateType) => {  //analog prev line
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));

        let res = await api.getUsers(currentPage, pageSize);
        dispatch(actions.setUsers(res.items))
        dispatch(actions.setTotalUserCount(res.totalCount))

        dispatch(actions.toggleIsFetching(false))
    }
}

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsType>,
    userId: number,
    apiMethod: any,
    actionType: (userId: number) => ActionsType
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionType(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThuncType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, api.follow.bind(api), actions.followSucsess)
}

export const unfollow = (userId: number): ThuncType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, api.unfollow.bind(api), actions.unfollowSucsess)
    }
}

export default usersReduser;