import { combineReducers, createStore, Reducer, Store } from "redux";

import { fishReducer } from "./fish";
import { userReducer } from "./user";

const rootReducer: Reducer = combineReducers({
  user: userReducer,
  fish: fishReducer,
});

const store: Store = createStore(rootReducer);

export default store;
