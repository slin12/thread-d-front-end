import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../sketches/LandingPageSketch";

class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export default LandingPage;
