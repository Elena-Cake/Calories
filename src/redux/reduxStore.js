import { combineReducers, legacy_createStore as createStore } from "redux";
import authReduser from "./authReduser";
import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";
import usersReduser from "./usersReduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser
});

let store = createStore(reducers);

export default store;