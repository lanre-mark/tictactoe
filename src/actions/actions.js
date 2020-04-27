import * as types from "./actionTypes";

export const selectBoardSize = (size) => ({
  type: types.SELECT_BOARD_SIZE,
  payload: size,
});

export const tickBoard = (baordId) => ({
  type: types.TICK_BOARD,
  payload: baordId,
});
