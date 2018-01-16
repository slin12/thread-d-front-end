import React from "react";
import P5Wrapper from "react-p5-wrapper";
import "../css/interactive.css";
import scroll from "../sketches/Scroll";
import square from "../sketches/Square";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class InteractiveSketch extends React.Component {
  state = {
    saved: false,
    backClicked: false
  };

  handleClick = () => {
    this.setState({
      saved: true
    });
  };

  handleBackClick = () => {
    this.setState({
      backClicked: true
    });
  };

  render() {
    return this.props.colors.length === 0 ? (
      <Redirect to="/" />
    ) : (
      <div id="interactive-sketch">
        <P5Wrapper
          sketch={this.props.sketchName === "scroll" ? scroll : square}
          saved={this.state.saved}
          history={this.props.history}
          createPattern={this.props.createPattern}
          backClicked={this.state.backClicked}
          colors={this.props.colors}
        />
        <div id="interactive-bottom-bar">
          <button onClick={this.handleBackClick} id="interactive-back">
            BACK
          </button>
          <span>
            Hit any button on the keyboard to pause animation. Scroll to change
            size of circles.
          </span>
          <button onClick={this.handleClick} id="interactive-save">
            SAVE
          </button>
        </div>
      </div>
    );
  }
}

// style={{
//   position: "absolute",
//   left: window.innerWidth - 200,
//   top: window.innerHeight - 80
// }}

const mapStateToProps = state => {
  return {
    colors: state.patternOptions.colors,
    sketchName: state.patternOptions.name
  };
};

export default withRouter(connect(mapStateToProps, actions)(InteractiveSketch));
