import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loggedInReducer from "./loggedInReducer";
import currentPatternReducer from "./currentPatternReducer";

export default combineReducers({
  user: userReducer,
  loggedIn: loggedInReducer,
  currentPattern: currentPatternReducer
});
