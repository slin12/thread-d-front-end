import React from "react";
import "../css/dashboard.css";
import PatternColorSelector from "./PatternColorSelector";

import { connect } from "react-redux";
import * as actions from "../actions";

class PatternSelector extends React.Component {
  handleInteractionSelection = (e, name) => {
    e.target.classList.add("interaction-selected");
  };

  colors = () => {
    let colors = [
      [
        "rgb(150, 187, 187)",
        "rgb(97, 137, 133)",
        "rgb(65, 69, 53)",
        "rgb(242, 227, 188)",
        "rgb(193, 152, 117)"
      ],
      [
        "rgb(27, 6, 94)",
        "rgb(255, 71, 218)",
        "rgb(255, 135, 171)",
        "rgb(252, 200, 194)",
        "rgb(245, 236, 205)"
      ],
      [
        "rgb(8, 96, 95)",
        "rgb(23, 126, 137)",
        "rgb(89, 131, 129)",
        "rgb(142, 147, 109)",
        "rgb(162, 173, 89)"
      ],
      [
        "rgb(219, 213, 110)",
        "rgb(136, 171, 117)",
        "rgb(45, 147, 173)",
        "rgb(125, 124, 132)",
        "rgb(222, 143, 110)"
      ],
      [
        "rgb(203, 212, 194)",
        "rgb(219, 235, 192)",
        "rgb(195, 178, 153)",
        "rgb(129, 83, 85)",
        "rgb(82, 50, 73)"
      ]
    ];

    return colors.map((c, idx) => {
      return <PatternColorSelector colors={c} key={idx} />;
    });
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
          </div>
          <h4>Choose A Color Scheme</h4>
          <div id="colors-container">{this.colors()}</div>
          <button
            style={
              this.props.selectedPattern.length > 0 &&
              this.props.selectedColor.length > 0
                ? null
                : { display: "none" }
            }
            id="start-interaction"
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
    selectedPattern: state.patternOptions.name,
    selectedColor: state.patternOptions.selectedColor
  };
};

export default connect(mapStateToProps, actions)(PatternSelector);
