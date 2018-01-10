import { CREATE_USER } from "./types";

export function createUser() {
  return dispatch => {
    console.log("hit create user in actions");
    dispatch({ type: CREATE_USER });
  };
}
