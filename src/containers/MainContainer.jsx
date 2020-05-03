import React, { Component } from "react";
import { connect } from "react-redux";
import BoardChoice from "../components/BoardSize.jsx";
import GameContainer from "./GameContainer.jsx";

const mapStateToProps = (state) => {
  return {
    gameBoardSize: state.game.size,
  };
};

const mapDispatchToProps = (dispatch) => {
  // dispatch the action of board size selection
  // return dispatch();
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    console.log("props::", props);
  }

  render() {
    return (
      <div className="game">
        <BoardChoice />
        {/* <GameContainer /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainContainer); //mapDispatchToProps
