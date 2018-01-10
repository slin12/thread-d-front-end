export default (state = false, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return true;
    default:
      return state;
  }
};
