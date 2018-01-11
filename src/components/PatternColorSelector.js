import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class PatternColorSelector extends React.Component {
  handleColorSelection = () => {
    this.props.setColor(this.props.colors);
  };

  colorboxes = () => {
    return this.props.colors.map((c, idx) => {
      return (
        <div
          className="individual-color-box"
          style={{ backgroundColor: c }}
          key={`color-${c}`}
        />
      );
    });
  };

  render() {
    return (
      <div
        className={
          this.props.selectedColor === this.props.colors[0]
            ? "color-box color-box-selected"
            : "color-box"
        }
        onClick={this.handleColorSelection}
      >
        {this.colorboxes()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedColor: state.patternOptions.selectedColor };
};

export default connect(mapStateToProps, actions)(PatternColorSelector);
