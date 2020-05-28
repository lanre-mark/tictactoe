import * as types from "../actions/actionTypes";
import winnerOnBoard from "../bl/ttt-logic";
import { removeState, saveState, updateStyle } from "../localStorage.js";

const initialState = {
  gameOver: false,
  drawGame: false,
  currentPlayer: "x",
  computerDenote: "",
  boardSlots: [],
  size: 0,
  boardDistribution: 100 + "%",
  move: -1,
  userCharacter: "x",
  saveState: false,
  description: "",
};

const gameReducers = (state = initialState, action) => {
  const newState = { ...state };
  let activityDesc = "";
  switch (action.type) {
    case types.TICK_BOARD:
      if (!newState.gameOver && !newState.drawGame) {
        // console.log("Played :: ", action.payload);
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
        activityDesc = `Playing now .... ${
          state.currentPlayer === "x" ? "O" : "X"
        }`;
        if (newState.nextMove === -2) {
          activityDesc =
            "There is no more winning spot to play, sorry it's a tie";
          newState.drawGame = true;
        }
        if (newState.gameOver) {
          activityDesc = `Player ${
            newState.currentPlayer === "x" ? "O" : "X"
          } has won the game.`;
        }
        if (newState.drawGame) {
          activityDesc = "The game is a tie.";
        }
        return {
          ...state,
          boardSlots: newState.boardSlots,
          currentPlayer: newState.currentPlayer,
          move: newState.nextMove,
          gameOver: newState.gameOver,
          drawGame: newState.drawGame,
          description: activityDesc,
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

      updateStyle(action.payload);

      /**
       * END NOT SURE
       */

      return {
        ...state,
        gameOver: false,
        drawGame: false,
        currentPlayer: state.userCharacter,
        boardSlots: [...Array(action.payload ** 2).keys()].map((d) => null),
        size: action.payload,
        boardDistribution: parseFloat(100 / action.payload).toFixed(4) + "%",
        computerDenote: state.currentPlayer === "x" ? "o" : "x",
        description: `Playing now .... ${
          state.currentPlayer === "x" ? "X" : "O"
        }`,
      };
    case types.GENERATE_TICK:
      activityDesc = `Playing now .... ${
        newState.computerDenote === "x" ? "O" : "X"
      }`;
      if (!newState.gameOver && !newState.drawGame && newState.move > -1) {
        newState.boardSlots = [...state.boardSlots];
        newState.boardSlots[newState.move] = newState.currentPlayer;
        newState.currentPlayer = newState.currentPlayer === "x" ? "o" : "x";
        // check if there is a winner
        [newState.gameOver, newState.drawGame] = winnerOnBoard(
          newState.boardSlots,
          newState.computerDenote,
          newState.computerDenote === "x" ? "o" : "x",
          true
        );

        if (newState.nextMove === -2) {
          activityDesc =
            "There is no more winning spot to play, sorry its a tie";
          newState.drawGame = true;
        }
        if (newState.gameOver) {
          activityDesc = `Player ${newState.computerDenote} has won the game.`;
        }
        if (newState.drawGame) {
          activityDesc = "The game is a tie.";
        }
        return {
          ...state,
          boardSlots: newState.boardSlots,
          currentPlayer: newState.currentPlayer,
          move: -1,
          gameOver: newState.gameOver,
          drawGame: newState.drawGame,
          description: activityDesc,
        };
      }
      return state;
    case types.CANCEL_GAME:
      return {
        ...initialState,
        currentPlayer: state.currentPlayer,
        computerDenote: state.computerDenote,
        userCharacter: state.userCharacter,
        saveState: state.saveState,
      };
    case types.RESTART_SESSION:
      const previousBoardSize = state.boardSlots.length
        ? Math.sqrt(state.boardSlots.length)
        : null;
      return {
        ...state,
        gameOver: false,
        drawGame: false,
        currentPlayer: state.userCharacter,
        boardSlots: previousBoardSize
          ? [...Array(previousBoardSize ** 2).keys()].map((d) => null)
          : [],
        size: previousBoardSize ? previousBoardSize : 0,
        boardDistribution: previousBoardSize
          ? parseFloat(100 / previousBoardSize).toFixed(4) + "%"
          : "100%",
        computerDenote: state.currentPlayer === "x" ? "o" : "x",
        description: "",
      };
    case types.CHANGE_USER_CHARACTER:
      newState.currentPlayer = state.userCharacter === "x" ? "o" : "x";
      newState.userCharacter = state.userCharacter === "x" ? "o" : "x";
      newState.computerDenote = newState.userCharacter === "x" ? "o" : "x";
      newState.description = "";
      return newState;
    case types.CHANGE_SESSION_PRESERVATION:
      newState.saveState = newState.saveState === true ? false : true;
      !newState.saveState ? removeState() : saveState();
      newState.description = "";
      return newState;
    default:
      return state;
  }
};

export default gameReducers;
