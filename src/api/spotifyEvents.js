const addSpotifyEventListeners = (player, functions) => {
  const {
    setSpDeviceId,
    currentSong,
    setCurrentSong,
    updating,
    setUpdating,
    duration,
    setDuration,
    position,
    setPosition,
    timeoutId,
    setTrackData,
    setLoading,
  } = functions;

  // Error handling
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener("player_state_changed", (state) => {
    if (currentSong !== state.track_window.current_track.uri && !updating) {
      setCurrentSong(state.track_window.current_track.uri);
      setTrackData(state);
      setUpdating(true);
      timeoutId.current = setTimeout(() => {
        setUpdating(false);
      }, 5000000);
    }
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    setSpDeviceId(device_id);
    setLoading(false);
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  // Connect to the player
  player.connect().then((success) => {
    if (success) {
      console.log("The Web Playback SDK succesfully connected to Spotify!");
    }
  });
};

export { addSpotifyEventListeners };
