import React, { Component } from "react";
import { connect } from "react-redux";
import GameBoard from "../components/GameBoard.jsx";

import * as playActions from "../actions/actions";

const mapStateToProps = (state) => {
  return {
    gameBoardSize: state.game.size,
    gameSessionOver: state.game.gameOver,
    gameSessionIsADraw: state.game.drawGame,
    gameSessionPlayer: state.game.currentPlayer,
    gameSessionState: state.game.boardSlots,
    gameComputerDenote: state.game.computerDenote,
    gameSessionMove: state.game.move,
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
});

class GameContainer extends Component {
  constructor(props) {
    super(props);
    // console.log("GameContainer::", props);
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
