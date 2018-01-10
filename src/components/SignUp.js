import React from "react";
import "../css/signup.css";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <h1 id="login-signup-title">thread'd</h1>
        <div id="login-signup-container">
          <div
            id="signup-container"
            style={{ height: window.innerHeight * 0.6 }}
          >
            <h3>Sign Up</h3>
          </div>

          <div
            id="login-container"
            style={{ height: window.innerHeight * 0.6 }}
          >
            <h3>Log In</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
