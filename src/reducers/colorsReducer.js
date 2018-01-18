export default (state = [], action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return action.user.colors;
    case "ADD_COLOR":
      return [...state, action.colors];
    default:
      return state;
  }
};
