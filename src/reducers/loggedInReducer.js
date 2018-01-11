export default (state = false, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return true;
    case "SET_LOGGED_IN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};
