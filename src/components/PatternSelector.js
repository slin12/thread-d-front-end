import React from "react";
import "../css/dashboard.css";

import { connect } from "react-redux";
import * as actions from "../actions";

class PatternSelector extends React.Component {
  handleInteractionSelection = (e, name) => {
    e.target.classList.add("interaction-selected");
  };

  render() {
    console.log("props in pattern selector", this.props);
    return (
      <div id="create-pattern-container" className="choices-child">
        <h3>Create A Pattern</h3>
        <div id="create-pattern-choices">
          <h4>Choose An Experience</h4>
          <div id="create-pattern-interactions">
            <div>
              <img
                src="https://s3.amazonaws.com/thread-d/assets/scroll-icon.jpg"
                className="interactive-img"
                onClick={() => this.props.setPatternName("scroll")}
                alt="scroll-interaction"
              />
              <br />
              <small>Scroll</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedPattern: state.patternOptions.name };
};

export default connect(mapStateToProps, actions)(PatternSelector);
