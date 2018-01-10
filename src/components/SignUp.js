import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../css/signup.css";

class SignUp extends React.Component {
  state = {
    signup: { name: "", email: "", password: "", passwordConfirm: "" },
    login: { email: "", password: "" },
    errors: []
  };

  handleChange = (e, topKey, key) => {
    let value = e.target.value;
    this.setState(prevState => {
      return {
        [topKey]: { ...prevState[topKey], [key]: value }
      };
    });
  };

  handleSignUpSubmit = e => {
    console.log("submitted!");
    e.preventDefault();
    this.props.createUser(this.state.signup);
  };

  render() {
    return (
      <div>
        <h1 id="login-signup-title">thread'd</h1>
        <div id="login-signup-container">
          <div
            id="signup-container"
            style={{ height: window.innerHeight * 0.6 }}
          >
            <h3>sign up</h3>
            <form className="topBefore" onSubmit={this.handleSignUpSubmit}>
              <input
                id="signup-name"
                type="text"
                placeholder="NAME"
                value={this.state.signup.name}
                autoComplete="off"
                onChange={e => {
                  this.handleChange(e, "signup", "name");
                }}
              />
              <input
                id="signup-email"
                type="text"
                placeholder="E-MAIL"
                autoComplete="off"
                value={this.state.signup.email}
                onChange={e => {
                  this.handleChange(e, "signup", "email");
                }}
              />
              <input
                id="signup-password"
                type="password"
                placeholder="PASSWORD"
                autoComplete="off"
                value={this.state.signup.password}
                onChange={e => {
                  this.handleChange(e, "signup", "password");
                }}
              />
              <input
                id="signup-password-confirm"
                type="password"
                placeholder="CONFIRM PASSWORD"
                autoComplete="off"
                value={this.state.signup.passwordConfirm}
                onChange={e => {
                  this.handleChange(e, "signup", "passwordConfirm");
                }}
              />
              <input id="signup-submit" type="submit" value="SIGN UP" />
            </form>
          </div>

          <div
            id="login-container"
            style={{ height: window.innerHeight * 0.6 }}
          >
            <h3>log in</h3>
            <form className="topBefore">
              <input
                id="login-email"
                type="text"
                placeholder="E-MAIL"
                value={this.state.login.email}
                autoComplete="off"
                onChange={e => {
                  this.handleChange(e, "login", "email");
                }}
              />
              <input
                id="login-password"
                type="password"
                placeholder="PASSWORD"
                autoComplete="off"
                value={this.state.login.password}
                onChange={e => {
                  this.handleChange(e, "login", "password");
                }}
              />
              <input id="login-submit" type="submit" value="LOG IN" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(SignUp);
