
import { api } from "../api/api"
import { updateObjectInArray } from "../utils/objects-helpers.js"
import { userType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"
import { Dispatch } from "redux"

const initialState = {
    users: [] as Array<userType>,
    pageSize: 8,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids
}
export type initialStateType = typeof initialState

const usersReduser = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'calories/user/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: true })
            };
        case 'calories/user/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: false })
            };
        case 'calories/user/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            };
        case 'calories/user/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        case 'calories/user/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUserCount: action.totalUserCount
            };
        case 'calories/user/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'calories/user/TOGGLE_IS_FOLLOWING_PROGRESS':
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
    followSucsess: (userId: number) => ({ type: 'calories/user/FOLLOW', userId } as const),
    unfollowSucsess: (userId: number) => ({ type: 'calories/user/UNFOLLOW', userId } as const),
    setUsers: (users: Array<userType>) => ({ type: 'calories/user/SET_USERS', users } as const),
    setCurrPage: (currentPage: number) => ({ type: 'calories/user/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUserCount: (totalUserCount: number) => ({ type: 'calories/user/SET_TOTAL_USERS_COUNT', totalUserCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'calories/user/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'calories/user/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
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
    await _followUnfollowFlow(dispatch, userId, api.follow.bind(api), actions.followSucsess)
}

export const unfollow = (userId: number): ThuncType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, api.unfollow.bind(api), actions.unfollowSucsess)
    }
}

export default usersReduser;