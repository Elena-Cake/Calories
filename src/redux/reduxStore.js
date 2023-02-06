import { combineReducers, legacy_createStore as createStore } from "redux";
import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser
});

let store = createStore(reducers);

export default store;