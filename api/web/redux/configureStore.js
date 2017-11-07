import {createStore, combineReducers} from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";
import plReducer from "./plReducer";

const configureStore = () => (
    createStore(
        combineReducers({
            txt: testReducer,
            user: userReducer,
            page: pageReducer,
            pl: plReducer
        })
    )
);

const store = configureStore();

export default store;
