import React from "react";
import { FaSpotify } from "react-icons/fa";
import queryString from "query-string";
import getCookie from "../../utilities/cookies";
import StreamingContext, {
  StreamingConsumer,
} from "../../contexts/streamingContext";

const SpotifyLogin = ({ redirectUri }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(loggedIn());
  const streamingContext = React.useContext(StreamingContext);

  let params = queryString.parse(window.location.hash);

  React.useEffect(() => {
    if (streamingContext.spotifyLoggedIn !== isLoggedIn) {
      streamingContext.updateSpotifyLogin(isLoggedIn);
    }
  }, [streamingContext.spotifyLoggedIn, isLoggedIn]);

  if (params["access_token"]) {
    const { access_token, expires_in } = params;
    document.cookie = `spotifyAccess=${access_token}; max-age=${expires_in}; path=/; SameSite=Lax;`;
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
            } else {
              loginToSpotify(redirectUri);
              setIsLoggedIn(true);
            }
          }}
        >
          {isLoggedIn ? "Disconnect Spotify" : "Connect Spotify"}
        </button>
      </div>
    </div>
  );
};

const loginToSpotify = (redirectUri) => {
  const scopes =
    "user-read-recently-played user-top-read streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing";
  window.location.href = `https://accounts.spotify.com/authorize?client_id=eafc1d75f4cf413e891b0392579ee5da&redirect_uri=${redirectUri}&response_type=token&scope=${encodeURIComponent(
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
