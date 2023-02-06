const FOLLOW = 'FOLLOW'
const SET_USERS = 'SET_USERS'

const initialState = {
    users: []
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
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })

export const setUsersAC = (users) => ({ type: SET_USERS, users })


export default usersReduser;