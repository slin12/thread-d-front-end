import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class PatternContainer extends React.Component {
  state = {
    imageArrayIdx: 0
  };

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

  patterns = () => {
    if (this.props.patterns.length > 0) {
      return this.props.patterns[this.state.imageArrayIdx].map(p => (
        <div
          className="pattern-image"
          key={p.url}
          onClick={() => this.props.selectPattern(p.url)}
        >
          <img
            src={p.url}
            alt="user-pattern"
            className={this.props.currentPattern === p.url ? "selected" : null}
          />
        </div>
      ));
    } else {
      return <p>You have no patterns! Make one now</p>;
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="choices-child">
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
        </div>
      </div>
    );
  }
}

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
  return { patterns: chunkedArray, currentPattern: state.currentPattern };
};

export default connect(mapStateToProps, actions)(PatternContainer);
