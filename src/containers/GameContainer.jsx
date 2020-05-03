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
    gameSessionState: state.game.spaces,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // dispatch the action of game board ticks
  playGame: (e, sz) => {
    dispatch(playActions.tickBoard(sz));
  },
});

class GameContainer extends Component {
  constructor(props) {
    super(props);
    console.log("GameContainer::", props);
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
              onPlayGame={this.props.playGame}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
