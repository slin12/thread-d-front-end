const defaultState = {
  name: "",
  colors: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_PATTERN_NAME":
      return { ...state, name: action.name };
    default:
      return state;
  }
};
