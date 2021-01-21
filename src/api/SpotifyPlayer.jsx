import React, { useState, useEffect, useRef, useContext } from "react";
import getCookie from "../utilities/cookies";
import { startSpotifyPlayback, pauseSpotifyPlayback } from "./spotifyPlayback";
import StreamingContext from "../contexts/streamingContext";

const Player = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [player, setPlayer] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const position = useRef(0);
  const duration = useRef(0);

  const { spDeviceId, setSpDeviceId } = useContext(StreamingContext);

  useEffect(() => {
    console.log("in here");
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("SDK is ready to roll");
      handleLoadSuccess(window.Spotify);
    };
  }, []);

  const handleLoadSuccess = (spotify) => {
    console.log("script loaded");
    setToken(getCookie("spotifyAccess"));
    window.Spotify = spotify;
    setPlayer(
      new window.Spotify.Player({
        name: "Trilofy Player",
        getOAuthToken: (cb) => {
          cb(getCookie("spotifyAccess"));
        },
      })
    );
    setLoading(false);
  };

  if (loading) {
    console.log("player is loading");
    return null;
  }

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
    console.log(state);
    position.current = state.position;
    duration.current = state.duration;
    if (position.current >= duration.current) {
      position.current = 0;
    }
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    setSpDeviceId(device_id);
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  // Connect to the player!
  player.connect().then((success) => {
    if (success) {
      console.log("The Web Playback SDK succesfully connected to Spotify!");
    }
  });
  return (
    <div>
      <p>the loaded player</p>
      <button
        onClick={() => {
          startSpotifyPlayback(
            spDeviceId,
            position.current,
            "spotify:track:4cAgkb0ifwn0FSHGXnr4F6"
          )
            .catch((e) => {
              console.log(e);
            })
            .then((resp) => {
              console.log(resp.json());
            });
        }}
      >
        Toggle Play
      </button>

      <button onClick={() => pauseSpotifyPlayback(spDeviceId)}>
        Pause Playback
      </button>
    </div>
  );
};

export default Player;
