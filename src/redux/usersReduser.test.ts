
import usersReduser, { actions, follow, initialStateType, unfollow } from "./usersReduser"

// thunks
import { ResponseType, ResultCodeEnum, api } from "../api/api";
jest.mock("../api/api")
let apiMock = api as jest.Mocked<typeof api>;

const result: ResponseType = {
    data: [],
    resultCode: ResultCodeEnum.Success,
    messages: []
}

apiMock.follow.mockReturnValue(Promise.resolve(result))
apiMock.unfollow.mockReturnValue(Promise.resolve(result))

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    apiMock.follow.mockClear()
    apiMock.unfollow.mockClear()
})

// state
let state: initialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                name: "Lena 0",
                id: 0,
                uniqueUrlName: null,
                status: "test",
                followed: false,
                photos: {
                    small: null,
                    large: null
                }
            },
            {
                name: "Lena 1",
                id: 1,
                uniqueUrlName: null,
                status: "test",
                followed: false,
                photos: {
                    small: null,
                    large: null
                }
            },
            {
                name: "Lena 2",
                id: 2,
                uniqueUrlName: null,
                status: null,
                followed: true,
                photos: {
                    small: null,
                    large: null
                }
            }
        ],
        pageSize: 8,
        totalUserCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test("follow success", () => {
    const newState = usersReduser(state, actions.followSucsess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();

})
test("unfollow success", () => {
    const newState = usersReduser(state, actions.unfollowSucsess(2))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();

})

// thunks

// test("follow success thunk", async () => {

//     const thunk = follow(1)
//     await thunk(dispatchMock, getStateMock, {})

//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSucsess(1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
// })

// test("unfollow success thunk", async () => {

//     const thunk = unfollow(2)
//     await thunk(dispatchMock, getStateMock, {})

//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSucsess(2))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2))
// })