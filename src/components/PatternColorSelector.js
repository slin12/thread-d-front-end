import React from "react";

class PatternColorSelector extends React.Component {
  colorboxes = () => {
    return this.props.colors.map((c, idx) => {
      return (
        <div className="individual-color-box" style={{ backgroundColor: c }} />
      );
    });
  };

  render() {
    return <div class="color-box">{this.colorboxes()}</div>;
  }
}

export default PatternColorSelector;
