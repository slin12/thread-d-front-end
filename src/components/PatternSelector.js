import React from "react";
import "../css/dashboard.css";
import PatternColorSelector from "./PatternColorSelector";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";

class PatternSelector extends React.Component {
  handleInteractionSelection = (e, name) => {
    e.target.classList.add("interaction-selected");
  };

  colors = () => {
    return this.props.colors.map((c, idx) => {
      return <PatternColorSelector colors={c} key={idx} />;
    });
  };

  handleStart = () => {
    this.props.history.push("/interact");
  };

  render() {
    return (
      <div id="create-pattern-container" className="choices-child">
        <h3>Create A Pattern</h3>
        <div id="create-pattern-choices">
          <h4>Choose An Experience</h4>
          <div id="create-pattern-interactions">
            <div>
              <img
                src="scroll-icon.jpg"
                className={
                  this.props.selectedPattern === "scroll"
                    ? "interactive-img interaction-selected"
                    : "interactive-img"
                }
                onClick={() => this.props.setPatternName("scroll")}
                alt="scroll-interaction"
              />
              <br />
              <small>Scroll</small>
            </div>
            <div>
              <img
                src="square-icon.jpg"
                className={
                  this.props.selectedPattern === "square"
                    ? "interactive-img interaction-selected"
                    : "interactive-img"
                }
                onClick={() => this.props.setPatternName("square")}
                alt="scroll-interaction"
              />
              <br />
              <small>Square</small>
            </div>
          </div>
          <h4>Choose A Color Scheme</h4>
          <div id="colors-container">
            {this.colors()}
            {this.props.colors.length < 6 ? (
              <div style={{ width: "50px", height: "100px", margin: "2%" }}>
                <h2 id="custom-color-button" onClick={this.props.toggleModal}>
                  +
                </h2>
              </div>
            ) : null}
          </div>
          <button
            style={
              this.props.selectedPattern.length > 0 &&
              this.props.selectedColor.length > 0
                ? null
                : { display: "none" }
            }
            id="start-interaction"
            onClick={this.handleStart}
          >
            START
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.colors,
    selectedPattern: state.patternOptions.name,
    selectedColor: state.patternOptions.selectedColor
  };
};

export default withRouter(connect(mapStateToProps, actions)(PatternSelector));
