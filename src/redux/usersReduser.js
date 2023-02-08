const FOLLOW = 'FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

const initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1
}

const usersReduser = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: !u.followed }
                    }
                    return u
                })
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
            }
        default:
            return state
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setCurrPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUserCountAC = (totalUserCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUserCount })

export default usersReduser;