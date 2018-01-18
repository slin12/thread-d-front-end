//This file handles all the actions sent to our reducers. These functions are imported and used with connect

import {
  SET_CURRENT_USER,
  SET_LOGGED_IN,
  SET_CURRENT_PATTERN,
  SET_PATTERN_NAME,
  SET_COLOR,
  SET_MODEL,
  UPDATE_USER_PATTERNS,
  LOGOUT,
  TOGGLE_MODAL
} from "./types";
import AuthAdapter from "../api";

export function createUser(user, history) {
  return dispatch => {
    AuthAdapter.signup(user).then(res => {
      console.log(res);
      if (!res.error) {
        localStorage.setItem("token", res.token);
        dispatch({ type: SET_CURRENT_USER, user: res.user });
        history.push("/dashboard");
      } else {
        dispatch({ type: SET_CURRENT_USER, user: res });
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
      } else {
        dispatch({ type: SET_CURRENT_USER, user: res });
      }
    });
  };
}

export function setLoggedIn(res) {
  return { type: SET_LOGGED_IN, user: res };
}

export function createPattern(imageUrl, history) {
  return dispatch => {
    AuthAdapter.createPattern(imageUrl).then(json => {
      dispatch({
        type: SET_CURRENT_PATTERN,
        imageUrl
      });
      dispatch({
        type: UPDATE_USER_PATTERNS,
        userPatterns: json.user_patterns
      });
      let slug = imageUrl.replace(
        "https://thread-d.s3.amazonaws.com/undefined/",
        ""
      );
      slug = slug.replace(".jpg", "");
      history.push(`/render/${slug}`);
    });
  };
}

export function selectPattern(imageUrl) {
  return { type: SET_CURRENT_PATTERN, imageUrl };
}

export function setPatternName(name) {
  return { type: SET_PATTERN_NAME, name };
}

export function addColor(colorArray) {
  return dispatch => {
    AuthAdapter.createColor(colorArray).then(json => {
      dispatch({ type: SET_CURRENT_USER, user: json });
    });
  };
}

export function setColor(colorArray) {
  return { type: SET_COLOR, colors: colorArray };
}

export function deleteColor(colorArray) {
  return dispatch => {
    AuthAdapter.deleteColor(colorArray).then(json => {
      dispatch({ type: SET_CURRENT_USER, user: json });
    });
  };
}

export function setModel(model) {
  return { type: SET_MODEL, model };
}

export function handleLogout(history) {
  localStorage.clear();
  history.push("/");
  return { type: LOGOUT };
}

export function toggleModal() {
  return { type: TOGGLE_MODAL };
}
