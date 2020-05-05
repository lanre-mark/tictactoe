import * as types from "../actions/actionTypes";
import winnerOnBoard from "../bl/ttt-logic";

const initialState = {
  gameOver: false,
  drawGame: false,
  currentPlayer: "x",
  computerDenote: "",
  boardSlots: [],
  size: 0,
  boardDistribution: 100 + "%",
  move: -1,
};

const gameReducers = (state = initialState, action) => {
  const newState = state;
  switch (action.type) {
    case types.TICK_BOARD:
      // console.log("Board was ticked/played");
      if (!newState.gameOver && !newState.drawGame) {
        newState.boardSlots = [...state.boardSlots];
        newState.boardSlots[action.payload] = newState.currentPlayer;
        newState.currentPlayer = newState.currentPlayer === "x" ? "o" : "x";
        [
          newState.gameOver,
          newState.drawGame,
          newState.nextMove,
        ] = winnerOnBoard(
          newState.boardSlots,
          newState.computerDenote,
          newState.computerDenote === "x" ? "o" : "x"
        );
        return {
          ...state,
          boardSlots: newState.boardSlots,
          currentPlayer: newState.currentPlayer,
          move: newState.nextMove,
          gameOver: newState.gameOver,
          drawGame: newState.drawGame,
        };
      }
      return state;
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
        computerDenote: state.currentPlayer === "x" ? "o" : "x",
      };
    case types.GAME_WINNER_STATE:
      return state;
    case types.GAME_DRAW_STATE:
      return state;
    case types.GENERATE_TICK:
      if (!newState.gameOver && !newState.drawGame && newState.move > -1) {
        newState.boardSlots = [...state.boardSlots];
        newState.boardSlots[newState.move] = newState.currentPlayer;
        newState.currentPlayer = newState.currentPlayer === "x" ? "o" : "x";
        // check if there is a winner
        [newState.gameOver, newState.drawGame] = winnerOnBoard(
          newState.boardSlots,
          newState.computerDenote,
          newState.computerDenote
        );
        return {
          ...state,
          boardSlots: newState.boardSlots,
          currentPlayer: newState.currentPlayer,
          move: -1,
          gameOver: newState.gameOver,
          drawGame: newState.drawGame,
        };
      }
      return state;
    default:
      return state;
  }
};

export default gameReducers;
