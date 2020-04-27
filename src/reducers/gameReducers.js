import * as types from "../actions/actionTypes";

const initialState = {
  gameOver: false,
  drawGame: false,
  currentPlayer: "x",
  spaces: [],
  size: 0,
};

const gameReducers = (state = initialState, action) => {
  if (action.type === types.TICK_BOARD) {
    return state;
  }
  if (action.type === types.SELECT_BOARD_SIZE) {
    return state;
  }
  return state;
  // switch (action.type) {
  //   case types.TICK_BOARD:
  //     return state;
  //   case types.SELECT_BOARD_SIZE:
  //     return state;
  //   case default:
  //     return state;
  // }
};

export default gameReducers;
