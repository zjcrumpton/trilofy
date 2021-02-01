import { createStore } from "redux";
import reducer from "../reducers/reducer";

const store = createStore(reducer, {
  windowPlatform: "spotify",
  playerPlatform: "spotify",
  playerStatus: "disabled",
  spotifyPlayerStatus: "disabled",
});

export default store;
