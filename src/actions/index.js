import { SET_CURRENT_USER } from "./types";
import AuthAdapter from "../api";

export function createUser(user) {
  return dispatch => {
    AuthAdapter.signup(user).then(res => {
      if (!res.errors) {
        localStorage.setItem("token", res.token);
        dispatch({ type: SET_CURRENT_USER, user: res.user });
      }
    });
    // console.log("hit create user in actions");
  };
}

export function loginUser(user) {
  return dispatch => {
    AuthAdapter.login(user).then(res => {
      if (!res.errors) {
        localStorage.setItem("token", res.token);
        dispatch({ type: SET_CURRENT_USER, user: res.user });
      }
    });
  };
}
