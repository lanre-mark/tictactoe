import * as types from "../actions/actionTypes";

const initialState = {
  gameOver: false,
  drawGame: false,
  currentPlayer: "x",
  computerDenote: "",
  boardSlots: [],
  size: 0,
  boardDistribution: 100 + "%",
};

/**
 *
 * @param {*} strucData :: the array containing size of board
 * @param {*} cp :: computer player denotion
 * @param {*} up :: user player denotion
 */
const winnerOnBoard = (strucData, cp, up) => {
  const currentBoard = [];
  let allDirections = [],
    diagRight = [],
    diagLeft = [];
  const boardUnit = Math.sqrt(strucData.length);
  for (let ii = 0; ii < strucData.length; ii += boardUnit) {
    currentBoard.push(strucData.slice(ii, ii + boardUnit));
  }
  // console.log(currentBoard);
  for (let rr = 0; rr < currentBoard.length; rr++) {
    const rowArr = [],
      colArr = [];
    for (let cc = 0; cc < currentBoard.length; cc++) {
      rowArr.push(currentBoard[rr][cc]);
      colArr.push(currentBoard[cc][rr]);
    }
    allDirections.push(rowArr);
    allDirections.push(colArr);
    diagRight.push(currentBoard[rr][rr]);
    diagLeft.push(currentBoard[rr][currentBoard.length - 1 - rr]);
  }
  allDirections.push(diagRight);
  allDirections.push(diagLeft);
  // console.log("================");
  // console.log(allDirections);
  const win = allDirections.some((d) => {
    return d.every((ch) => {
      return ch === d[0] && d[0] != null;
    });
  });
  let draw = false;
  if (!win) {
    // if there is no winner yet
    // check if there is a draw
    draw = !strucData.includes(null);
  }
  // performing algorithm for computer's next play
  // all directions are in allDirections
  // need to make sure other player is not about to win

  // boardUnit is the number of plays required ina  direction
  const newDirections = allDirections.map((arr) => ({
    plays: arr,
    up: arr.filter((p) => p === up).length, // number of user plays in direction
    cp: arr.filter((p) => p === cp).length, // number of computer plays in direction
    pls: up + cp, // total numbers of plays
  }));

  console.log("here is the direction pattern :: ", newDirections);

  return [win, draw]; // will be returning a double tuple of winState, drawState, nextComputerPlay
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
      // console.log("Board was ticked/played");
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
        computerDenote: state.currentPlayer === "x" ? "o" : "x",
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
