import { combineReducers, legacy_createStore as createStore } from "redux";
import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";
import usersReduser from "./usersReduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser
});

let store = createStore(reducers);

export default store;