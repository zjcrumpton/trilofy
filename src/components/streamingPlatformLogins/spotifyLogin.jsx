import React, { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import queryString from "query-string";
import getCookie from "../../utilities/cookies";
import { setSpotifyToken } from "../../actions/actions";
import { useSelector, useDispatch, connect } from "react-redux";
import useSpotifyToken from "../../hooks/useSpotifyToken";
import checkSpotifyToken from "../../api/spotifyAuth";
import { useLocation } from "react-router-dom";

const SpotifyLogin = ({ redirectUri, changeSpotifyToken }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(loggedIn());
  // let [token, setTokenState] = useSpotifyToken();

  const [token, setToken] = useState(checkSpotifyToken());
  const [needToken, setNeedToken] = useState(true);
  const location = useLocation();

  console.log("login is rendering");
  console.log(token);

  let params = queryString.parse(window.location.hash);

  const logoutOfSpotify = () => {
    document.cookie = "spotifyAccess=expired; max-age=0; path=/; SameSite=Lax";
    localStorage.removeItem("spotifyToken");
    setToken(checkSpotifyToken());
  };

  useEffect(() => {
    console.log("spotify login using effect");
    if (params["access_token"] && needToken) {
      const { access_token, expires_in } = params;

      let expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 2);
      const tokenObject = {
        token: access_token,
        expires_at: expireTime,
      };

      localStorage.spotifyToken = JSON.stringify(tokenObject);
      setNeedToken(false);
      setToken(checkSpotifyToken());

      console.log(JSON.parse(localStorage.getItem("spotifyToken")));

      document.cookie = `spotifyAccess=${access_token}; max-age=${expires_in}; path=/; SameSite=Lax;`;
    }
  }, [params]);

  return (
    <div className="centered-flex-container platform-settings">
      <div className="platform-card">
        <FaSpotify size={100} color={token ? "#17d85d" : "#adbdcc"} />
        <button
          className="connect-button clickable"
          onClick={() => {
            if (token) {
              logoutOfSpotify();
            } else {
              loginToSpotify(redirectUri);
            }
          }}
        >
          {token ? "Disconnect Spotify" : "Connect Spotify"}
        </button>
      </div>
    </div>
  );
};

const loginToSpotify = (redirectUri) => {
  console.log("logging in to spotify");
  const scopes =
    "user-read-recently-played user-top-read streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing";
  window.location.href = `https://accounts.spotify.com/authorize?client_id=eafc1d75f4cf413e891b0392579ee5da&redirect_uri=${redirectUri}&response_type=token&scope=${encodeURIComponent(
    scopes
  )}`;
};

const loggedIn = () => {
  return getCookie("spotifyAccess") && getCookie("spotifyAccess") !== "expired"
    ? true
    : false;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSpotifyToken: (token) => dispatch(setSpotifyToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(SpotifyLogin);
