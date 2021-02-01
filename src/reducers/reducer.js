const reducer = (state, action) => {
  console.log(action);
  console.log("dispatching");

  switch (action.type) {
    case "SET_WINDOW_PLATFORM":
      return {
        ...state,
        windowPlatform: action.platform,
      };
    default:
      return state;
  }
};

export default reducer;
