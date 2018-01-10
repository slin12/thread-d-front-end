import React from "react";
import P5Wrapper from "react-p5-wrapper";
import "../css/interactive.css";
import sketch from "../sketches/InteractiveOne";

class InteractiveSketch extends React.Component {
  render() {
    return (
      <div id="interactive-sketch">
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export default InteractiveSketch;
