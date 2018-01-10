import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../sketches/LandingPageSketch";

class LandingPage extends React.Component {
  state = {
    clicked: false
  };

  handleClick = e => {
    this.setState({
      clicked: true
    });
    this.forceUpdate();
  };

  render() {
    console.log("landing page props", this.props);
    return (
      <div id="landing-page" onClick={this.handleClick}>
        <P5Wrapper
          sketch={sketch}
          clicked={this.state.clicked}
          history={this.props.history}
        />
        <button
          onClick={this.handleClick}
          className="landing-page-b"
          style={{
            position: "absolute",
            left: window.innerWidth / 2 - 75,
            top: window.innerHeight / 2 + 30
          }}
        >
          get started
        </button>
      </div>
    );
  }
}

export default LandingPage;
