import { combineReducers } from "redux";

import gameReducers from "./gameReducers";

const reducers = combineReducers({
  // if we had other reducers, they would go here
  game: gameReducers,
});

// make the combined reducers available for import
export default reducers;
