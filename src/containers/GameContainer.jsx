import React, { Component } from "react";
import { connect } from "react-redux";
import GameBoard from "../components/GameBoard.jsx";
import BoardActions from "../components/BoardActions.jsx";

import * as playActions from "../actions/actions";

const mapStateToProps = (state) => {
  // console.log("Game Container Props Mapped", state);
  return {
    gameBoardSize: state.game.size,
    gameSessionOver: state.game.gameOver,
    gameSessionIsADraw: state.game.drawGame,
    gameSessionPlayer: state.game.currentPlayer,
    gameSessionState: state.game.boardSlots,
    gameComputerDenote: state.game.computerDenote,
    gameSessionMove: state.game.move,
    gameSessionActivity: state.game.description,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // dispatch the action of game board ticks
  playGame: (e, sz) => {
    dispatch(playActions.tickBoard(sz));
  },
  computeGame: () => {
    dispatch(playActions.generateMove());
  },
  cancelGame: () => {
    dispatch(playActions.cancelGame());
  },
  restartSession: () => {
    dispatch(playActions.restartGameSession());
  },
});

class GameContainer extends Component {
  constructor(props) {
    super(props);
    // console.log("GameContainer::", this.props);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (
        !this.props.gameSessionOver &&
        !this.props.gameSessionIsADraw &&
        this.props.gameComputerDenote === this.props.gameSessionPlayer
      ) {
        // comnputer plays while game is not a draw nor game's session is over
        this.props.computeGame();
      }
    }, 500);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          {this.props.gameSessionState.map((space, index) => (
            <GameBoard
              key={`space-${index}`}
              symbol={space}
              index={index}
              computeSymbol={this.props.gameComputerDenote}
              playSymbol={this.props.gameSessionPlayer}
              onPlayGame={this.props.playGame}
            />
          ))}
        </div>
        <BoardActions
          onCancelGame={this.props.cancelGame}
          onRestartSession={this.props.restartSession}
          gameActionDisplay={this.props.gameSessionActivity}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
