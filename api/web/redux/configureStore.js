import {createStore, combineReducers} from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import pageReducer from "./pageReducer"

const configureStore = () => (
    createStore(
        combineReducers({
            txt: testReducer,
            user: userReducer,
            page: pageReducer
        })
    )
);

const store = configureStore();

export default store;
