import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
