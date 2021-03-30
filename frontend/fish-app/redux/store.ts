import {combineReducers, createStore, Reducer, Store} from "redux";

import {fishReducer} from "./fish";

const rootReducer : Reducer = combineReducers({
    fish: fishReducer,
});

const store: Store = createStore(rootReducer);

export default store;