import React from "react";
import P5Wrapper from "react-p5-wrapper";
import "../css/interactive.css";
import sketch from "../sketches/InteractiveOne";

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
    return (
      <div id="interactive-sketch">
        <P5Wrapper
          sketch={sketch}
          saved={this.state.saved}
          history={this.props.history}
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

export default InteractiveSketch;
