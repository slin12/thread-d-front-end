export default (state = "", action) => {
  switch (action.type) {
    case "SET_CURRENT_PATTERN":
      return action.imageUrl;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
};
