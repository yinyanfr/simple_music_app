import {createStore, combineReducers} from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";

const configureStore = () => (
    createStore(
        combineReducers({
            txt: testReducer,
            user: userReducer
        })
    )
);

const store = configureStore();

export default store;
