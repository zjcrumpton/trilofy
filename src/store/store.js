import { createStore } from "redux";
import reducer from "../reducers/reducer";
import checkSpotifyToken from "../api/spotifyAuth";

const store = createStore(reducer, {
  windowPlatform: "spotify",
  playerPlatform: "spotify",
  playerStatus: "disabled",
  spotifyPlayerStatus: "disabled",
  spotifyToken: checkSpotifyToken(),
});

export default store;
