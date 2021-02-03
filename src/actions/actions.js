export const setWindowPlatform = (platform) => {
  return {
    type: "SET_WINDOW_PLATFORM",
    platform,
  };
};

export const setPlayerPlatform = (platform) => {
  return {
    type: "SET_PLAYER_PLATFORM",
    platform,
  };
};

export const setSpotifyToken = (token) => {
  return {
    type: "SET_SPOTIFY_TOKEN",
    token,
  };
};
