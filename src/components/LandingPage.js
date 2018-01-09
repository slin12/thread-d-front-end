import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../sketches/LandingPageSketch";

class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <P5Wrapper sketch={sketch} />
        <h1 id="landing-page-title">Welcome</h1>
      </div>
    );
  }
}

export default LandingPage;
