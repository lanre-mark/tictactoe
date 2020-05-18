import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import UserGameIcon from "./PlayerIcon.jsx";
import PreserveSwitchIcon from "./SwitchIcon.jsx";

const GameSettings = (props) => {
  return (
    <div className="preserve__settings">
      <div className="player" onClick={props.onUserCharacterChange}>
        <div className="player__label">User Character</div>
        <SwitchTransition>
          <CSSTransition
            key={props.gameCharacter}
            timeout={800}
            classNames={"player__icon-"}
          >
            <UserGameIcon symbol={props.gameCharacter} />
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="preserve" onClick={props.onPreservationChange}>
        <div className="preserve__label">Preserve Game</div>
        <SwitchTransition>
          <CSSTransition
            key={props.gamePreservation}
            timeout={800}
            classNames={"preserve__icon-"}
          >
            <PreserveSwitchIcon switch={props.gamePreservation} />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default GameSettings;
