import React from "react";
import "../css/colorpicker.css";

import { connect } from "react-redux";
import * as actions from "../actions";

import { SketchPicker } from "react-color";

class CustomColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    //default colors that show up in modal
    colors: [
      "rgb(150, 187, 187)",
      "rgb(97, 137, 133)",
      "rgb(65, 69, 53)",
      "rgb(242, 227, 188)",
      "rgb(193, 152, 117)"
    ],
    mouseX: 0,
    mouseY: 0,
    currentColor: null
  };

  handleClick = (e, idx) => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
      mouseX: e.screenX,
      mouseY: e.screenY,
      currentColor: idx
    });
  };

  handleColorSubmit = () => {
    //once you're done, closes the modal and goes to our actions to update backend and redux
    this.props.toggleModal();
    this.props.addColor(this.state.colors);
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    //make sure format stays consistent
    let rgb = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    //make copy of array to non-destructively modify
    let tempColors = this.state.colors.slice();
    tempColors[this.state.currentColor] = rgb;
    this.setState({ colors: tempColors });
  };

  render() {
    const styles = {
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      }
    };

    return (
      <div
        id="custom-color-picker-background"
        onClick={e =>
          e.target.id === "custom-color-picker-background"
            ? this.props.toggleModal()
            : null
        }
      >
        <div
          id="custom-color-picker-container"
          style={{
            width: window.innerWidth * 0.75,
            height: window.innerHeight * 0.6,
            margin: "0 auto"
          }}
        >
          <h1>Create A Custom Color Scheme</h1>
          <div
            id="custom-color-container"
            style={{
              width: window.innerWidth * 0.5,
              height: window.innerHeight / 4,
              margin: "0 auto"
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: window.innerWidth / 10,
                height: window.innerHeight / 4,
                backgroundColor: this.state.colors[0]
              }}
              onClick={e => this.handleClick(e, 0)}
            />
            <div
              style={{
                display: "inline-block",
                width: window.innerWidth / 10,
                height: window.innerHeight / 4,
                backgroundColor: this.state.colors[1]
              }}
              onClick={e => this.handleClick(e, 1)}
            />
            <div
              style={{
                display: "inline-block",
                width: window.innerWidth / 10,
                height: window.innerHeight / 4,
                backgroundColor: this.state.colors[2]
              }}
              onClick={e => this.handleClick(e, 2)}
            />
            <div
              style={{
                display: "inline-block",
                width: window.innerWidth / 10,
                height: window.innerHeight / 4,
                backgroundColor: this.state.colors[3]
              }}
              onClick={e => this.handleClick(e, 3)}
            />
            <div
              style={{
                display: "inline-block",
                width: window.innerWidth / 10,
                height: window.innerHeight / 4,
                backgroundColor: this.state.colors[4]
              }}
              onClick={e => this.handleClick(e, 4)}
            />

            {this.state.displayColorPicker ? (
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: this.state.mouseY - 50,
                  left: this.state.mouseX + 50
                }}
              >
                <div style={styles.cover} onClick={this.handleClose} />
                <SketchPicker
                  color={this.state.colors[this.state.currentColor]}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
          </div>
          <button id="submit-custom-color" onClick={this.handleColorSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(CustomColorPicker);
