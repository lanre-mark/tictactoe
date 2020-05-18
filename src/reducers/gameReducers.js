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
  userCharacter: "x",
  saveState: false,
  description: "",
};

const gameReducers = (state = initialState, action) => {
  const newState = { ...state };
  console.log("Action dispatched :: ", action.type);
  switch (action.type) {
    case types.TICK_BOARD:
      console.log("Board was ticked/played");
      if (!newState.gameOver && !newState.drawGame) {
        newState.boardSlots = [...state.boardSlots];
        newState.boardSlots[action.payload] = newState.currentPlayer;
        newState.currentPlayer = newState.currentPlayer === "x" ? "o" : "x";
        console.log("WinOrLooseOnBoard");
        [
          newState.gameOver,
          newState.drawGame,
          newState.nextMove,
        ] = winnerOnBoard(
          newState.boardSlots,
          newState.computerDenote,
          newState.computerDenote === "x" ? "o" : "x"
        );
        console.log("completed WinOrLooseOnBoard");
        if (newState.nextMove === -2) {
          // then there is no alternative approach to move
          console.log("no more available spots to play");
          newState.drawGame = true;
        }
        if (newState.gameOver) {
          console.log(
            newState.currentPlayer === "x" ? "o" : "x",
            " just won the game"
          );
        }
        if (newState.drawGame) {
          console.log("There is a draw");
        }
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
        currentPlayer: state.userCharacter,
        boardSlots: [...Array(action.payload ** 2).keys()].map((d) => null),
        size: action.payload,
        boardDistribution: parseFloat(100 / action.payload).toFixed(4) + "%",
        computerDenote: state.currentPlayer === "x" ? "o" : "x",
      };
    // case types.GAME_WINNER_STATE:
    //   return state;
    // case types.GAME_DRAW_STATE:
    //   return state;
    case types.GENERATE_TICK:
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
        // if (newState.nextMove === -2) {
        //   // then there is no alternative approach to move
        //   console.log("no more available spots to play");
        //   newState.drawGame = true;
        // }
        if (newState.gameOver) {
          console.log(newState.computerDenote, " just won the game");
        }
        if (newState.drawGame) {
          console.log("There is a draw");
        }
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
    case types.CANCEL_GAME:
      // cancel the game and return to MainContainer
      // clear game board and all others but retain
      //                                     computerDenote, userCharacter, currentPlayer & saveState
      return {
        ...initialState,
        currentPlayer: state.currentPlayer,
        computerDenote: state.computerDenote,
        userCharacter: state.userCharacter,
        saveState: state.saveState,
      };
    // return state;
    case types.RESTART_SESSION:
      return state;
    case types.CHANGE_USER_CHARACTER:
      newState.currentPlayer = state.userCharacter === "x" ? "o" : "x";
      newState.userCharacter = state.userCharacter === "x" ? "o" : "x";
      newState.computerDenote = newState.userCharacter === "x" ? "o" : "x";
      console.log("User Character Change State : ", newState);
      return newState;
    case types.CHANGE_SESSION_PRESERVATION:
      newState.saveState = newState.saveState === true ? false : true;
      return newState;
    default:
      return state;
  }
};

export default gameReducers;
