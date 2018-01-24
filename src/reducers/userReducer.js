export default (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.user;
    case "SET_LOGGED_IN":
      return action.user;
    case "LOGOUT":
      return {};
    case "UPDATE_USER_PATTERNS":
      return { ...state, patterns: action.userPatterns };
    default:
      return state;
  }
};
