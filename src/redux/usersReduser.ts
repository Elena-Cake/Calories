
import { api } from "../api/api"
import { updateObjectInArray } from "../utils/objects-helpers.js"
import { userType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"
import { Dispatch } from "redux"

const initialState = {
    users: [] as Array<userType>,
    pageSize: 8,
    filters: { term: '', friend: null as null | boolean },
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids
}
type initialStateType = typeof initialState
export type FiltersType = typeof initialState.filters

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
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        case 'calories/user/SET_FILTERS':
            return {
                ...state,
                filters: action.filters
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
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'calories/user/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
    setFilters: (filters: FiltersType) => ({ type: 'calories/user/SET_FILTERS', filters } as const),

}


type ThuncType = BaseThunkType<ActionsType>
//getUsersThunkCreator
export const getUsers = (currentPage: number, pageSize: number, filters: FiltersType = { term: '', friend: null })
    : ThuncType => {
    // return async (dispatch: Dispatch<ActionsType>, getState: () => AppStateType) => {  //analog prev line
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));

        dispatch(actions.setCurrPage(currentPage))
        dispatch(actions.setFilters(filters))

        let res = await api.getUsers(currentPage, pageSize, filters.term, filters.friend);
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