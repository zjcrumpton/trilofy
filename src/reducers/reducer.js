const reducer = (state, action) => {
  console.log(action);
  console.log("dispatching");

  switch (action.type) {
    case "SET_WINDOW_PLATFORM":
      return {
        ...state,
        windowPlatform: action.platform,
      };
    case "SET_PLAYER_PLATFORM":
      return {
        ...state,
        playerPlatform: action.platform,
      };
    default:
      return state;
  }
};

export default reducer;
