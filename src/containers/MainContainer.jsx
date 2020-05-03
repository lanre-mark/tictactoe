import React, { Component } from "react";
import { connect } from "react-redux";
import BoardChoice from "../components/BoardSize.jsx";
import GameContainer from "./GameContainer.jsx";
import * as gameActions from "../actions/actions";

const mapStateToProps = (state) => {
  return {
    gameBoardSize: state.game.size,
    gameBoardRatio: state.game.boardDistribution,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // dispatch the action of board size selection
  onBoardSizeSelection: (e, sz) => {
    dispatch(gameActions.selectBoardSize(sz));
  },
});

class MainContainer extends Component {
  constructor(props) {
    super(props);
    console.log("MainContainer props::", props);
  }

  render() {
    return (
      <div>
        {this.props.gameBoardSize === 0 && (
          <BoardChoice
            gameBoardSize={this.props.gameBoardSize}
            onSizeSelection={this.props.onBoardSizeSelection}
          />
        )}
        {this.props.gameBoardSize > 0 && <GameContainer />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer); //mapDispatchToProps
