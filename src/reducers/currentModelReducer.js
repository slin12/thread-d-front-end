export default (state = "", action) => {
  switch (action.type) {
    case "SET_MODEL":
      return action.model;
    default:
      return state;
  }
};
