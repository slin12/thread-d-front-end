import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions";

import AuthAdapter from "./api";

import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

class App extends Component {
  componentWillMount() {
    if (localStorage.getItem("token")) {
      AuthAdapter.authorizeUser().then(res => {
        if (res.errors) {
          localStorage.clear();
        } else {
          this.props.setLoggedIn();
        }
      });
    }
  }

  render() {
    console.log("props in app", this.props);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default withRouter(connect(mapStateToProps, actions)(App));
