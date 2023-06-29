import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux"
import authReduser from "./authReduser"
import dialogsReduser from "./dialogsReduser"
import profileReduser from "./profileReduser"
import usersReduser from "./usersReduser"
import thunkMiddleware from "redux-thunk"
import appReduser from "./appReduser"

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    app: appReduser
});

type rootReduserType = typeof reducers
export type AppStateType = ReturnType<rootReduserType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// for Redux Devtools
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store