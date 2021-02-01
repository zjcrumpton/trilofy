import { createStore } from "redux";
import reducer from "../reducers/reducer";

const store = createStore(reducer, {
  windowPlatform: "Spotify",
  playerPlatfrom: null,
});

export default store;
