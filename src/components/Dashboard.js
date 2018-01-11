import React from "react";
import "../css/dashboard.css";
import PatternSelector from "./PatternSelector";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <button
          id="log-out"
          onClick={() => this.props.handleLogout(this.props.history)}
        >
          LOG OUT
        </button>
        <div id="dashboard-container">
          <h1 id="dashboard-title">
            Welcome back,{" "}
            {this.props.user[0].toUpperCase() + this.props.user.slice(1)}
          </h1>
          <h4>What would you like to do?</h4>
          <div id="choices-dashboard-container">
            <PatternSelector />
            <div id="see-designs-container" className="choices-child">
              <h3>See Your Designs</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user.name };
};

export default withRouter(connect(mapStateToProps, actions)(Dashboard));
