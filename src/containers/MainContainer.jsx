import React, { Component } from "react";
import { connect } from "react-redux";
import GameContainer from "./GameContainer.jsx";

const mapStateToProps = (state) => {
  return {
    gameBoardSize: state.gameBoardSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  // dispatch the action of board size selection
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // console.log(this.props);
  }

  render() {
    return (
      <div className="game">
        <GameContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
