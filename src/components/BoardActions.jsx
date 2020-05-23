import React from "react";

const BoardActions = (props) => {
  return (
    <div className="game-actions">
      <div className="action__message">{props.gameActionDisplay}</div>
      <div
        className="action__session"
        onClick={(e) => {
          // props.onRestartSession();
        }}
      >
        Restart Session
      </div>
      <div
        className="action__end"
        onClick={(e) => {
          props.onCancelGame();
        }}
      >
        Cancel Game
      </div>
    </div>
  );
};

export default BoardActions;
