import React from "react";
// import { render } from "react-dom";
import { CSSTransition } from "react-transition-group";
import X from "./OptionX.jsx";
import O from "./OptionO.jsx";

// ----------
// Game Board
// ----------

export const GameBoard = (props) => {
  return (
    <button
      onClick={() => {
        !props.symbol ? props.setSpace(props.index) : null;
      }}
      className={`
        game-board__button
        ${props.symbol ? "game-board__button--disabled" : ""}
      `}
    >
      <CSSTransition
        in={props.symbol === "x"}
        timeout={700}
        classNames={"x-"}
        exit={false}
        mountOnEnter={true}
      >
        <X />
      </CSSTransition>

      <CSSTransition
        in={props.symbol === "o"}
        timeout={700}
        classNames={"o-"}
        exit={false}
        mountOnEnter={true}
      >
        <O />
      </CSSTransition>
    </button>
  );
};
