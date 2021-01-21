import React from "react";

const PlayerContext = React.createContext();

const PlayerProvider = PlayerContext.Provider;
const PlayerConsumer = PlayerContext.Consumer;

export { PlayerProvider, PlayerConsumer };
export default PlayerContext;
