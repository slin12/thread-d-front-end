import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions";

import "./css/render.css";

import AuthAdapter from "./api";

import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import InteractiveSketch from "./components/InteractiveSketch";
import Render from "./components/Render";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends Component {
  //make sure auth is completed before rendering anything
  state = {
    authCompleted: false
  };

  componentWillMount() {
    //if we already have a token, hit our backend to confirm it
    if (localStorage.getItem("token")) {
      AuthAdapter.authorizeUser().then(res => {
        if (res.errors) {
          localStorage.clear();
        } else {
          this.props.setLoggedIn(res);
          this.setState({
            authCompleted: true
          });
        }
      });
      //or direct them to the landing page
    } else {
      this.setState({
        authCompleted: true
      });
    }
  }

  render() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Mobile|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return (
        <div style={{ textAlign: "center", padding: "3%" }}>
          <h1
            style={{
              fontFamily: "Libre Franklin",
              fontSize: "3.5em",
              color: "rgb(235, 81, 96)",
              marginBottom: "3%"
            }}
          >
            thread'd
          </h1>
          <h4 style={{ color: "rgb(179, 172, 167)" }}>
            Because of the graphic heavy nature of 3D rendering, thread'd can
            not be viewed on mobile devices. Please come back on your laptop or
            desktop computer!
          </h4>
        </div>
      );
    } else if (this.state.authCompleted === true) {
      return (
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.authCompleted && this.props.loggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/welcome" />
                );
              }}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/welcome" component={LandingPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/interact" component={InteractiveSketch} />
            <Route path="/render/:url" component={Render} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="loading" style={{ height: window.innerHeight }}>
          <ReactCSSTransitionGroup
            transitionName="loading"
            transitionAppear={true}
            transitionAppearTimeout={700}
            transitionEnter={false}
            transitionLeave={false}
          >
            <h1>Loading...</h1>
          </ReactCSSTransitionGroup>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default withRouter(connect(mapStateToProps, actions)(App));
