import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    gameBoardSize: state.gameBoardSize,
    gameSessionOver: state.gameOver,
    gameSessionIsADraw: state.drawGame,
    gameSessionPlayer: state.currentPlayer,
    gameSessionState: state.spaces,
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
