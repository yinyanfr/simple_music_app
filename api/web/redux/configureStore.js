import {createStore, combineReducers} from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";
import plReducer from "./plReducer";
import i18nReducer from "./i18nReducer";

const configureStore = () => (
    createStore(
        combineReducers({
            txt: testReducer,
            user: userReducer,
            page: pageReducer,
            pl: plReducer,
            i18n: i18nReducer
        })
    )
);

const store = configureStore();

export default store;
