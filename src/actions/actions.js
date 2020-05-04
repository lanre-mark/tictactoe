import * as types from "./actionTypes";

export const selectBoardSize = (size) => ({
  type: types.SELECT_BOARD_SIZE,
  payload: size,
});

export const tickBoard = (baordId) => ({
  type: types.TICK_BOARD,
  payload: baordId,
});

export const gameWinner = () => ({
  type: types.GAME_WINNER_STATE,
  payload: true,
});

export const gameDrawn = () => ({
  type: types.GAME_DRAW_STATE,
  payload: true,
});

export const playerChanged = (nextPlayer) => ({
  type: types.GAME_PLAYER_CHANGE,
  payload: nextPlayer,
});

export const generateMove = () => ({
  type: types.GENERATE_TICK,
  payload: 0,
});
