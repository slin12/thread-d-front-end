import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class PatternContainer extends React.Component {
  //keep track of where we are in the array right now
  state = {
    imageArrayIdx: 0
  };

  // componentWillReceiveProps() {
  //   this.setState({ imageArrayIdx: 0 });
  // }

  //these two functions handle the arrows that show your patterns
  handleBackClick = () => {
    let newState = this.state.imageArrayIdx - 1;
    if (newState < 0) {
      newState = this.props.patterns.length - 1;
    }
    this.setState({
      imageArrayIdx: newState
    });
  };

  handleFrontClick = () => {
    let newState = this.state.imageArrayIdx + 1;
    if (newState > this.props.patterns.length - 1) {
      newState = 0;
    }
    this.setState({
      imageArrayIdx: newState
    });
  };

  //connected to the start button
  handleStart = e => {
    e.preventDefault();
    //makes a unique url for the render page for sharing
    let slug = this.props.currentPattern.replace(
      "https://thread-d.s3.amazonaws.com/undefined/",
      ""
    );
    slug = slug.replace(".jpg", "");
    this.props.history.push(`/render/${slug}`);
  };

  handleDelete = url => {
    if (this.props.patterns[this.state.imageArrayIdx].length === 1) {
      this.setState({ imageArrayIdx: 0 });
    }
    this.props.deletePattern(url);
  };

  patterns = () => {
    if (this.props.patterns.length > 0) {
      return this.props.patterns[this.state.imageArrayIdx].map(p => (
        <div key={p.url}>
          <div
            className="pattern-image"
            onClick={() => this.props.selectPattern(p.url)}
          >
            <img
              src={p.url}
              alt="user-pattern"
              className={
                this.props.currentPattern === p.url ? "selected" : null
              }
            />
          </div>
          <div
            className="delete-pattern"
            onClick={() => {
              this.handleDelete(p.url);
            }}
          >
            ✖︎
          </div>
        </div>
      ));
    } else {
      return <p>You have no patterns! Make one now</p>;
    }
  };

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="patterns"
        transitionAppear={true}
        transitionAppearTimeout={800}
        transitionEnter={false}
        transitionLeave={false}
        component="div"
        className="choices-child"
      >
        <h3>See Your Designs</h3>
        <div id="your-patterns">
          <h4>Your Patterns </h4>
          <div id="your-patterns-container-flex">{this.patterns()}</div>
          {this.props.patterns.length > 1 ? (
            <span onClick={this.handleBackClick}>◅ </span>
          ) : null}
          {this.props.patterns.length > 1 ? (
            <span onClick={this.handleFrontClick}> ▻</span>
          ) : null}

          <div id="male-female-container">
            <h4>Choose A T-Shirt </h4>
            <div id="male-female-choice">
              <div onClick={() => this.props.setModel("male")}>
                <h1
                  className={
                    this.props.model === "male" ? "symbol selected" : "symbol"
                  }
                >
                  ♂
                </h1>{" "}
                <small>Male</small>
              </div>
              <div onClick={() => this.props.setModel("female")}>
                <h1
                  className={
                    this.props.model === "female" ? "symbol selected" : "symbol"
                  }
                >
                  ♀
                </h1>{" "}
                <small>Female</small>
              </div>
            </div>
          </div>
          <button
            style={
              this.props.currentPattern.length > 0 &&
              this.props.model.length > 0
                ? null
                : { display: "none" }
            }
            id="start-render"
            onClick={this.handleStart}
          >
            START
          </button>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

//splits our pattern array into an array or arrays each size 3
const chunkArray = array => {
  let copyArray = [...array];
  let results = [];
  while (copyArray.length) {
    results.push(copyArray.splice(0, 3));
  }
  return results;
};

const mapStateToProps = state => {
  let chunkedArray = chunkArray(state.user.patterns);
  return {
    patterns: chunkedArray,
    currentPattern: state.currentPattern,
    model: state.currentModel
  };
};

export default withRouter(connect(mapStateToProps, actions)(PatternContainer));
