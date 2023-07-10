import { AppStateType } from "./reduxStore";

export const getAllUsersInfo = (state: AppStateType) => state.usersPage.users
export const getUsersTotalCount = (state: AppStateType) => state.usersPage.totalUserCount
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize
export const getFilters = (state: AppStateType) => state.usersPage.filters
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching

