export default (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      console.log("create_user in user reducer");
      return action.user;
    case "SET_LOGGED_IN":
      console.log("set logged in in user reducer", action.user);
      return action.user;
    default:
      return state;
  }
};
