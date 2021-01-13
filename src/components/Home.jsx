import React from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import NewReleases from "../api/NewReleases";
import RecentlyPlayed from "../api/RecentlyPlayed";
import SpotifyLogin from "./streamingPlatformLogins/spotifyLogin";
import TopArtists from "../api/TopArtists";

const Home = () => {
  const streamingContext = React.useContext(StreamingContext);

  if (streamingContext.spotifyLoggedIn !== isSpotifyActive()) {
    streamingContext.updateSpotifyLogin(isSpotifyActive());
  }

  return streamingContext.spotifyLoggedIn ? (
    <div className="dashboard-panel">
      <NewReleases />
      <RecentlyPlayed />
      <TopArtists />
    </div>
  ) : (
    loggedOutNotice()
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
