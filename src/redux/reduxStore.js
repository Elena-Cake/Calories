import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import authReduser from "./authReduser";
import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";
import usersReduser from "./usersReduser";
import thunkMiddleware from "redux-thunk"
import appReduser from "./appReduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    app: appReduser
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;