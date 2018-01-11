import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loggedInReducer from "./loggedInReducer";
import currentPatternReducer from "./currentPatternReducer";
import patternOptionsReducer from "./patternOptionsReducer";

export default combineReducers({
  user: userReducer,
  loggedIn: loggedInReducer,
  currentPattern: currentPatternReducer,
  patternOptions: patternOptionsReducer
});
