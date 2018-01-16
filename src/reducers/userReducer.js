export default (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      console.log("create_user in user reducer");
      return action.user;
    case "SET_LOGGED_IN":
      console.log("set logged in in user reducer", action.user);
      return action.user;
    case "LOGOUT":
      return {};
    case "UPDATE_USER_PATTERNS":
      return { ...state, patterns: action.userPatterns };
    default:
      return state;
  }
};
