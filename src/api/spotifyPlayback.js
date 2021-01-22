import getCookie from "../utilities/cookies";

const startSpotifyPlayback = (id, position, uri) =>
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getCookie("spotifyAccess")}`,
    },
    body: JSON.stringify({
      uris: uri,
      position_ms: position,
    }),
  });

const pauseSpotifyPlayback = (id) =>
  fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getCookie("spotifyAccess")}`,
    },
  });

export { startSpotifyPlayback, pauseSpotifyPlayback };
