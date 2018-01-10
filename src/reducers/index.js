import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loggedInReducer from "./loggedInReducer";

export default combineReducers({
  user: userReducer,
  loggedIn: loggedInReducer
});
