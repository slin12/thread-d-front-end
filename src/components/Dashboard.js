import React from "react";
import "../css/dashboard.css";
import PatternSelector from "./PatternSelector";
import PatternContainer from "./PatternContainer";
import CustomColorPicker from "./CustomColorPicker";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import * as actions from "../actions";

class Dashboard extends React.Component {
  render() {
    return this.props.loggedIn ? (
      <div>
        {this.props.showModal ? <CustomColorPicker /> : null}
        <button
          key="logout-button"
          id="log-out"
          onClick={() => this.props.handleLogout(this.props.history)}
        >
          LOG OUT
        </button>
        <div id="dashboard-container">
          <ReactCSSTransitionGroup
            transitionName="dashboard-title"
            transitionAppear={true}
            transitionAppearTimeout={1200}
            transitionEnter={false}
            transitionLeave={false}
          >
            <h1 id="dashboard-title">
              Welcome back,{" "}
              {this.props.user[0].toUpperCase() + this.props.user.slice(1)}
            </h1>
            <h4>What would you like to do?</h4>
          </ReactCSSTransitionGroup>
          <div id="choices-dashboard-container">
            <PatternSelector />
            <PatternContainer />
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.name,
    loggedIn: state.loggedIn,
    showModal: state.showModal
  };
};

export default withRouter(connect(mapStateToProps, actions)(Dashboard));
