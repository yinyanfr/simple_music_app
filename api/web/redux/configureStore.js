import {createStore, combineReducers} from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";
import plReducer from "./plReducer";
import playerReducer from "./playerReducer";

const configureStore = () => (
    createStore(
        combineReducers({
            txt: testReducer,
            user: userReducer,
            page: pageReducer,
            pl: plReducer,
            player: playerReducer
        })
    )
);

const store = configureStore();

export default store;
