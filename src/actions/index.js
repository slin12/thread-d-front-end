import {
  SET_CURRENT_USER,
  SET_LOGGED_IN,
  SET_CURRENT_PATTERN,
  SET_PATTERN_NAME,
  SET_COLOR,
  LOGOUT
} from "./types";
import AuthAdapter from "../api";

export function createUser(user, history) {
  return dispatch => {
    AuthAdapter.signup(user).then(res => {
      if (!res.errors) {
        localStorage.setItem("token", res.token);
        dispatch({ type: SET_CURRENT_USER, user: res.user });
        history.push("/dashboard");
      }
    });
  };
}

export function loginUser(user, history) {
  return dispatch => {
    AuthAdapter.login(user).then(res => {
      console.log(res);
      if (!res.error) {
        localStorage.setItem("token", res.token);
        dispatch({ type: SET_CURRENT_USER, user: res.user });
        history.push("/dashboard");
      }
    });
  };
}

export function setLoggedIn(res) {
  return { type: SET_LOGGED_IN, user: res };
}

export function createPattern(imageUrl) {
  return dispatch => {
    AuthAdapter.createPattern(imageUrl).then(json => {
      dispatch({ type: SET_CURRENT_PATTERN, imageUrl });
    });
  };
}

export function setPatternName(name) {
  return { type: SET_PATTERN_NAME, name };
}

export function setColor(colorArray) {
  return { type: SET_COLOR, colors: colorArray };
}

export function handleLogout(history) {
  localStorage.clear();
  history.push("/");
  return { type: LOGOUT };
}
