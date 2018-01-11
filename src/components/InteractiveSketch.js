import React from "react";
import P5Wrapper from "react-p5-wrapper";
import "../css/interactive.css";
import sketch from "../sketches/InteractiveOne";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class InteractiveSketch extends React.Component {
  state = {
    saved: false
  };

  handleClick = () => {
    this.setState({
      saved: true
    });
  };

  render() {
    return this.props.colors.length === 0 ? (
      <Redirect to="/" />
    ) : (
      <div id="interactive-sketch">
        <P5Wrapper
          sketch={sketch}
          saved={this.state.saved}
          history={this.props.history}
          createPattern={this.props.createPattern}
          colors={this.props.colors}
        />
        <button
          onClick={this.handleClick}
          id="interactive-save"
          style={{
            position: "absolute",
            left: window.innerWidth - 200,
            top: window.innerHeight - 80
          }}
        >
          save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.patternOptions.colors
  };
};

export default withRouter(connect(mapStateToProps, actions)(InteractiveSketch));
