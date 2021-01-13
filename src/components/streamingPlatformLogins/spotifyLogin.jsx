import React from "react";
import { FaSpotify } from "react-icons/fa";
import queryString from "query-string";
import getCookie from "../../utilities/cookies";
import StreamingContext, {
  StreamingConsumer,
} from "../../contexts/streamingContext";

const SpotifyLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(loggedIn());
  const streamingContext = React.useContext(StreamingContext);

  let params = queryString.parse(window.location.hash);

  if (params["access_token"]) {
    const { access_token, expires_in } = params;
    document.cookie = `spotifyAccess=${access_token}; max-age=${expires_in}; path=/; SameSite=Lax;`;

    localStorage.setItem("spotifyAccess", params["access_token"]);
  }

  return (
    <div className="centered-flex-container platform-settings">
      <div className="platform-card">
        <FaSpotify size={100} color={isLoggedIn ? "#17d85d" : "#adbdcc"} />
        <button
          className="connect-button clickable"
          onClick={() => {
            if (streamingContext.spotifyLoggedIn) {
              logoutOfSpotify();
              setIsLoggedIn(false);
              streamingContext.updateSpotifyLogin(false);
            } else {
              loginToSpotify();
              setIsLoggedIn(true);
              streamingContext.updateSpotifyLogin(true);
            }
          }}
        >
          {isLoggedIn ? "Disconnect Spotify" : "Connect Spotify"}
        </button>
      </div>
    </div>
  );
};

const loginToSpotify = () => {
  const scopes = "user-read-recently-played";
  window.location.href = `https://accounts.spotify.com/authorize?client_id=eafc1d75f4cf413e891b0392579ee5da&redirect_uri=https://localhost:3000/dashboard/settings&response_type=token&scope=${encodeURIComponent(
    scopes
  )}`;
};

const logoutOfSpotify = () => {
  document.cookie = "spotifyAccess=expired; max-age=0; path=/; SameSite=Lax";
};

const loggedIn = () => {
  return getCookie("spotifyAccess") && getCookie("spotifyAccess") !== "expired"
    ? true
    : false;
};

export default SpotifyLogin;
