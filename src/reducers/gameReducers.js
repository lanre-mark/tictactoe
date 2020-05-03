import * as types from "../actions/actionTypes";

const initialState = {
  gameOver: false,
  drawGame: false,
  currentPlayer: "x",
  boardSlots: [],
  size: 0,
  boardDistribution: 100 + "%",
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
      const newState = state;
      if (!newState.gameOver && !newState.drawGame) {
        newState.boardSlots = [...state.boardSlots];
        newState.boardSlots[action.payload] = newState.currentPlayer;
        newState.currentPlayer = newState.currentPlayer === "x" ? "o" : "x";
        // if (this.winnerOnBoard(newState.boardSlots)) {
        //   newState.gameOver = true;
        // }
        // if (this.noWinnerState(newState.boardSlots)) {
        //   newState.drawGame = true;
        // }
      }
      return {
        ...state,
        boardSlots: newState.boardSlots,
        currentPlayer: newState.currentPlayer,
      };
    case types.SELECT_BOARD_SIZE:
      // console.log("selected size of board");
      // return a brand new state
      /**
       * NOT sure if this is the best idea or way to do this
       * but this hacky way solves this idea of flexibility in the gameBoard
       * based on the size selected
       */
      document.documentElement.style.setProperty(
        "--proportion",
        parseFloat(100 / action.payload).toFixed(4) + "%"
      );
      /**
       * END NOT SURE
       */

      return {
        ...state,
        gameOver: false,
        drawGame: false,
        currentPlayer: "x",
        boardSlots: [...Array(action.payload ** 2).keys()].map((d) => null),
        size: action.payload,
        boardDistribution: parseFloat(100 / action.payload).toFixed(4) + "%",
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
