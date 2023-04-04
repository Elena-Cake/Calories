import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";
import usersReduser from "./usersReduser";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;