import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";
import { loadState, saveState } from "./localStorage.js";
// we are adding composeWithDevTools here to get easy access to the Redux dev tools

const persistedState = loadState();

const store = createStore(reducers, persistedState, composeWithDevTools());

export default store;
