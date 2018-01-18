const defaultState = {
  name: "",
  colors: [],
  selectedColor: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_PATTERN_NAME":
      return { ...state, name: action.name };
    case "SET_COLOR":
      return {
        ...state,
        colors: action.colors,
        selectedColor: action.colors.join("")
      };
    case "LOGOUT":
      return defaultState;
    default:
      return state;
  }
};
