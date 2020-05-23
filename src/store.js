import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";
import { removeState, loadState, saveState } from "./localStorage.js";
// we are adding composeWithDevTools here to get easy access to the Redux dev tools

const persistedState = loadState();

const store = createStore(reducers, persistedState, composeWithDevTools());

// subscribe to the store object using Observer pattern
store.subscribe(() => {
  const currentState = store.getState();
  if (currentState.game.saveState) {
    saveState({
      game: store.getState().game,
    });
  }
});

export default store;
