import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    gameBoardSize: state.game.size,
    gameSessionOver: state.game.gameOver,
    gameSessionIsADraw: state.game.drawGame,
    gameSessionPlayer: state.game.currentPlayer,
    gameSessionState: state.game.spaces,
  };
};

const mapDispatchToProps = (dispatch) => {
  // dispatch the action of game board ticks
};

class GameContainer extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // console.log(this.props);
  }

  render() {
    return <div className="game-board"></div>;
  }
}
//, mapDispatchToProps
export default connect(mapStateToProps)(GameContainer);
