import * as types from "../actions/actionTypes";

const initialState = {
  gameOver: false,
  drawGame: false,
  currentPlayer: "x",
  boardSlots: [],
  size: 0,
};

const gameReducers = (state = initialState, action) => {
  // if (action.type === types.TICK_BOARD) {
  //   return state;
  // }
  // if (action.type === types.SELECT_BOARD_SIZE) {
  //   console.log("selected size of board");
  //   // return a brand new state
  //   return {
  //     ...state,
  //     gameOver: false,
  //     drawGame: false,
  //     currentPlayer: "x",
  //     boardSlots: [...Array(action.payload ** 2).keys()].map((d) => null),
  //     size: action.payload,
  //   };
  // }
  // return state;
  switch (action.type) {
    case types.TICK_BOARD:
      console.log("Board was ticked/played");
      // const newState = state;
      // if (!newState.gameOver && !newState.drawGame) {
      //   newState.boardSlots = [...currentState.boardSlots];
      //   newState.boardSlots[index] = newState.currentPlayer;
      //   newState.currentPlayer = newState.currentPlayer === "x" ? "o" : "x";
      //   // if (this.winnerOnBoard(newState.boardSlots)) {
      //   //   newState.gameOver = true;
      //   // }
      //   // if (this.noWinnerState(newState.boardSlots)) {
      //   //   newState.drawGame = true;
      //   // }
      // }
      return { ...state };
    case types.SELECT_BOARD_SIZE:
      // console.log("selected size of board");
      // return a brand new state
      return {
        ...state,
        gameOver: false,
        drawGame: false,
        currentPlayer: "x",
        boardSlots: [...Array(action.payload ** 2).keys()].map((d) => null),
        size: action.payload,
      };
    case action.GAME_WINNER_STATE:
      return state;
    case action.GAME_DRAW_STATE:
      return state;
    case action.GAME_PLAYER_CHANGE:
      return state;
    default:
      return state;
  }
};

export default gameReducers;
