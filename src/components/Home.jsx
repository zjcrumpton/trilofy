import React, { useState } from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import NewReleases from "../api/NewReleases";
import RecentlyPlayed from "../api/RecentlyPlayed";
import SpotifyLogin from "./streamingPlatformLogins/spotifyLogin";
import TopArtists from "../api/TopArtists";
import Loader from "react-loader-spinner";
import FeaturedPlaylists from "../api/FeaturedPlaylists";
import checkSpotifyToken from "../api/spotifyAuth";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react/cjs/react.development";

const Home = () => {
  const platform = useSelector((state) => state.windowPlatform);
  const [spotifyToken, setSpotifyToken] = useState(checkSpotifyToken());

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setSpotifyToken(checkSpotifyToken());
    setLoading(false);
  }, [spotifyToken]);

  if (loading) {
    return (
      <Loader
        type="TailSpin"
        color="#adbdcc"
        height={100}
        width={100}
        className="centered-loader"
      />
    );
  }

  if (!spotifyToken && platform === "spotify") {
    return loggedOutNotice();
  }

  if (platform === "spotify") {
    return (
      <div className="dashboard-panel">
        <div className="spacer"></div>
        <div className="spacer"></div>
        <NewReleases />
        <RecentlyPlayed />
        <TopArtists />
        <FeaturedPlaylists />
        <div className="spacer"></div>
      </div>
    );
  }

  return (
    <div>
      <p>Soundcloud/youtube</p>
    </div>
  );
};

const loggedOutNotice = () => {
  return (
    <div className="dashboard-panel dashboard-login">
      <SpotifyLogin redirectUri="https://localhost:3000/dashboard/home" />
    </div>
  );
};

const isSpotifyActive = () => {
  return getCookie("spotifyAccess") && getCookie("spotifyAccess") !== "expired"
    ? true
    : false;
};

export default Home;
