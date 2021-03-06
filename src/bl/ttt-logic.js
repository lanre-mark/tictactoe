/**
 *
 * @param {String} cde The code generated for the direction from indexToCodify
 * @param {Number} bz the size of the board
 * returns an Index matching the particular direction in allDirections array/object
 */
const codifyToIndex = (cde, bz) => {
  if (cde.charAt(0) === "D") {
    // this is diagonal
    return bz * 2 + parseInt(cde.charAt(1)) - 1;
  } else {
    return cde.charAt(0) === "H"
      ? parseInt(cde.charAt(1)) * 2 - 2
      : cde.charAt(0) === "V"
      ? parseInt(cde.charAt(1)) * 2 - 1
      : 0;
  }
};
// console.log("Code H1 ==", codifyToIndex("H1", 5));

/**
 *
 * @param {Number} ndx The current Index of the direction Array generated from the sessionBoard
 * @param {Number} bz The size of the board user selected to play
 * returns a code to identify the direction such that we can easily remap to the allDirections array/object
 */
const indexToCodify = (ndx, bz) => {
  if (ndx + 1 > bz * 2) {
    // if the index + 1 is greater than boardSize multiplied by 2
    // that means its not any of the row OR column directions but diagonal
    return ndx + 1 === bz * 2 + 1 ? "D1" : "D2";
  } else {
    //
    return `${(ndx + 1) % 2 === 0 ? "V" : "H"}${Math.ceil((ndx + 1) / 2)}`;
  }
};

/**
 *
 * @param {Number} boardSize Size of board
 * @param {Number} identifiedSpot Index to be played in the direction identified
 * @param {String} directionCode code of the direction generated from indexToCodify
 * return index for the gameBoardSession to be played by the computer
 */
const unPlayedPositionToindex = (boardSize, identifiedSpot, directionCode) => {
  if (directionCode.charAt(0) === "D") {
    return directionCode.substr(1) === "1"
      ? identifiedSpot * boardSize + identifiedSpot // L-R diagonal
      : identifiedSpot * boardSize + (boardSize - identifiedSpot - 1); // R- L diagonal // reverse identifiedSport using boardSize as magnitude
  } else {
    return directionCode.charAt(0) === "H"
      ? boardSize * (parseInt(directionCode.substr(1)) - 1) + identifiedSpot // row direction // multiple the boardSize by number in the direction less by 1 for zero index and add the indentifiedSpot
      : boardSize * identifiedSpot + (parseInt(directionCode.substr(1)) - 1); // column direction // multiple the boardSize by the identifiedSpot and add the column in the code
  }
};

const spoilerMove = (directRow) => {
  for (let ii = 0; ii < directRow.plays.length; ii++) {
    if (!directRow.plays[ii]) {
      // console.log("Location to Spoil ::", ii);
      // console.log(directRow);
      return unPlayedPositionToindex(directRow.plays.length, ii, directRow.pos);
    }
  }
  return -1;
};
// const tst = { plays: ["x", "x", null, "x", "x"], pos: "V3" }; // "D2", "H3", "H1", "V4", "V3"
// console.log(spoilerMove(tst));

/**
 *
 * @param {Array/Collection} collection Colelction to be shuffled
 * returns a randomly shuffled/rearranged collection
 */
const shuffle = function (collection) {
  if (collection) {
    for (let ii = collection.length - 1; ii > 0; ii--) {
      const jj = Math.floor(Math.random() * ii);
      [collection[ii], collection[jj]] = [collection[jj], collection[ii]];
    }
  }
  return collection;
};

/**
 *
 * @param {Number} rangeSize Size of colelction or any number/interger argument to base the size of a random number
 * returns a random number between 0 and rangeSize argument
 */
const randomizeType = (rangeSize) => {
  return Number((Math.random() * (Math.floor(rangeSize) - 1)).toFixed(0));
};

/**
 *
 * @param {Array/Collection} rndDirection
 * return index of randomly proposed identified spot
 */
const unplayedSlotsOnly = (rndDirection) => {
  let randomIndexFromDirection;
  while (1) {
    // 1 returns truthy
    randomIndexFromDirection = randomizeType(rndDirection.length);

    if (!rndDirection[randomIndexFromDirection]) {
      break;
    }
    // keep looping until there is an empty spot available to play
    // within the randomly selected direction
  }
  // Default return
  return randomIndexFromDirection;
};

/**
 *
 * @param {Array/Collection} state Current state of tic-tac-toe directions
 * NOT USED ANYMORE @param {String} cp computer play denotion
 *  NOT USED @param {Enum/Constant} type  A constant to indicate the type of FreeStyle computation.
 */
const freeStyleMove = (state) => {
  //, type
  let availDirection,
    trials = [],
    compensateMove = false;
  // if (type === FREE_STYLE.COMMENCE) {
  // means we're only in the empty directions

  const freeSyles = {
    0: (currState) => {
      return currState.filter(
        (inDirection) => inDirection.cp > 0 && inDirection.up === 0
      );
    }, //computer plays without user plays
    1: (currState) => {
      return currState.filter(
        // (inDirection) => inDirection.cp > 0 && inDirection.up > 0
        (inDirection) =>
          inDirection.cp > 0 &&
          inDirection.up > 0 &&
          inDirection.cp > inDirection.up
      );
    }, //computer plays with user plays
    2: (currState) => {
      return currState.filter((inDirection) => inDirection.pls === 0);
    }, //no user nor compuer plays
  };

  const compensateSyles = {
    0: (currState) => {
      return currState.filter(
        (inDirection) => inDirection.pls < inDirection.plays.length
      ); // just play anywhere to avoid endless loop
    },
  };

  while (trials.length <= Object.keys(freeSyles).length) {
    let frT;
    if (trials.length < Object.keys(freeSyles).length) {
      frT = randomizeType(Object.keys(freeSyles).length);
      availDirection = freeSyles[frT](state.slice());
    } else {
      frT = 0;
      compensateMove = true;
      availDirection = compensateSyles[frT](state.slice());
      // console.log("Compensate move activated");
    }

    // console.log("freeStyles :: ", availDirection);
    if (availDirection.length > 0) {
      const randomDirection = randomizeType(availDirection.length);
      const whtWe = unPlayedPositionToindex(
        availDirection[randomDirection].plays.length,
        unplayedSlotsOnly(availDirection[randomDirection].plays),
        availDirection[randomDirection].pos
      );
      if (whtWe >= 0) {
        return whtWe;
      }
    }
    // console.log("Adding " + frT + " to ", trials);
    if (compensateMove) {
      // console.log("Compensate move unsuccessful");
      // means we have moved from compensateStyles cos there is no more available
      // slots on the board to play using the computer's character
      // hence we've had to play anywhere on the board
      // but now there is no space even with playing just any position/slot
      return -2;
    }
    !trials.includes(frT) ? trials.push(frT) : null;
  }
  // console.log("Returning back with nothing");
  return -2;
};

/**
 *
 * @param {*} strucData :: the array containing size of board
 * @param {*} cp :: computer player denotion
 * @param {*} up :: user player denotion
 */
const winnerOnBoard = (strucData, cp, up, simulate = false) => {
  const currentBoard = [];
  let allDirections = [],
    objDirections = [],
    diagRight = [],
    diagLeft = [],
    symadiag = 0,
    symbbdiag = 0,
    symadiag_ = 0,
    symbbdiag_ = 0;
  const boardUnit = Math.sqrt(strucData.length);
  for (let ii = 0; ii < strucData.length; ii += boardUnit) {
    currentBoard.push(strucData.slice(ii, ii + boardUnit));
  }
  // console.log(currentBoard);
  for (let rr = 0; rr < currentBoard.length; rr++) {
    const rowArr = [],
      colArr = [];
    let syma = 0,
      symbb = 0,
      syma_ = 0,
      symbb_ = 0;
    for (let cc = 0; cc < currentBoard.length; cc++) {
      // count the number of up (user plays) and cp (computed plays) in direction of row currentBoard[rr][cc]
      currentBoard[rr][cc] === up
        ? syma++
        : currentBoard[rr][cc] === cp
        ? symbb++
        : null;
      // count the number of up (user plays) and cp (computed plays) in direction of column currentBoard[cc][rr]
      currentBoard[cc][rr] === up
        ? syma_++
        : currentBoard[cc][rr] === cp
        ? symbb_++
        : null;
      rowArr.push(currentBoard[rr][cc]);
      colArr.push(currentBoard[cc][rr]);
    }
    allDirections.push(rowArr);
    objDirections.push({ plays: rowArr, up: syma, cp: symbb });
    allDirections.push(colArr);
    objDirections.push({ plays: colArr, up: syma_, cp: symbb_ });
    // count the number of up (user plays) and cp (computed plays) in direction of L-R diagonal currentBoard[rr][rr]
    currentBoard[rr][rr] === up
      ? symadiag++
      : currentBoard[rr][rr] === cp
      ? symbbdiag++
      : null;
    // count the number of up (user plays) and cp (computed plays) in direction of R-L diagonal currentBoard[rr][currentBoard.length - 1 - rr]
    currentBoard[rr][currentBoard.length - 1 - rr] === up
      ? symadiag_++
      : currentBoard[rr][currentBoard.length - 1 - rr] === cp
      ? symbbdiag_++
      : null;
    diagRight.push(currentBoard[rr][rr]);
    diagLeft.push(currentBoard[rr][currentBoard.length - 1 - rr]);
  }
  allDirections.push(diagRight);
  objDirections.push({ plays: diagRight, up: symadiag, cp: symbbdiag });
  allDirections.push(diagLeft);
  objDirections.push({ plays: diagLeft, up: symadiag_, cp: symbbdiag_ });

  const win = allDirections.some((d) => {
    return d.every((ch) => {
      return ch === d[0] && d[0] != null;
    });
  });
  let draw = false;

  // performing algorithm for computer's next play
  // all directions are in allDirections
  // need to make sure other player is not about to win

  // boardUnit is the number of plays required ina  direction
  // Also remove any direction that has completed its plays using the filter
  const newDirections = objDirections
    .map((arr, ndx) => ({
      ...arr,
      pls: arr.cp + arr.up, // total numbers of plays
      pos: indexToCodify(ndx, boardUnit),
    }))
    .filter((rr) => rr.pls < boardUnit);

  if (!win) {
    // if there is no winner yet
    // check if there is a draw
    // console.log("Let's check for a draw");
    // console.log(newDirections);
    // console.log(
    //   "Disqualified Directions ",
    //   newDirections.filter((mv) => mv.cp > 0 && mv.up > 0).length
    // );
    // console.log("All available directions :: ", newDirections.length);
    draw =
      !strucData.includes(null) ||
      newDirections.filter((mv) => mv.cp > 0 && mv.up > 0).length ===
        newDirections.length;
  }

  // console.log("here is the direction pattern :: ", newDirections);
  const userBoard = [...newDirections].sort((a, b) => b.up - a.up);
  // console.log("Sorted by User Board :: ", userBoard);
  const compuBoard = [...newDirections].sort((a, b) => b.cp - a.cp);
  // console.log("Sorted by Computer Board :: ", compuBoard);

  let compuMove = -1;
  if (!win && !draw && !simulate) {
    // if (
    //   userBoard[0].up === userBoard[1].up &&
    //   userBoard[0].up >= Math.ceil(boardUnit / 2)
    // ) {
    //   // i.e user more than half way up and in multiple directions
    if (userBoard[0].up === boardUnit - 1) {
      //i.e. user requires only one step for COMP to WIN
      // then be defensive
      // console.log("Proceding with spoilerMove for defense");
      // console.log("userBoard :: ", userBoard);
      // console.log("userBoard[0]  :: ", userBoard[0]);
      compuMove = spoilerMove(userBoard[0]);
    } else if (compuBoard[0].up === boardUnit - 1) {
      //i.e. user requires only one step for USER to WIN
      // then be defensive
      // console.log("Proceding with spoilerMove for checkout");
      compuMove = spoilerMove(compuBoard[0]);
    } else {
      // do a freestyle for the User but using the most accomplished direction
      // use the already sorted
      // console.log("Proceding with freeStyleMove");
      compuMove = freeStyleMove(newDirections); //, FREE_STYLE.COMMENCE);
      draw = compuMove === -2 ? true : false;
    }
    // console.log("Proposed Moved :: ", compuMove);
  }
  // else {
  //   console.log("No proposed move");
  // }
  return [win, draw, compuMove]; // will be returning a double tuple of winState, drawState, nextComputerPlay
};

export default winnerOnBoard;
