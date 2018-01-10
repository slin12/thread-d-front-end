export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_USER":
      console.log("create_user in user reducer");
    default:
      return state;
  }
};
