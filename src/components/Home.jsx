import React from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import NewReleases from "../api/NewReleases";
import RecentlyPlayed from "../api/RecentlyPlayed";

const Home = () => {
  const streamingContext = React.useContext(StreamingContext);

  if (streamingContext.spotifyLoggedIn !== isSpotifyActive()) {
    streamingContext.updateSpotifyLogin(isSpotifyActive());
  }

  return streamingContext.spotifyLoggedIn ? (
    <div className="dashboard-panel">
      <NewReleases />
      <RecentlyPlayed />
    </div>
  ) : (
    loggedOutNotice()
  );
};

const loggedOutNotice = () => {
  return (
    <div>
      <p>You are logged out of spotify</p>
    </div>
  );
};

const isSpotifyActive = () => {
  return getCookie("spotifyAccess") && getCookie("spotifyAccess") !== "expired"
    ? true
    : false;
};

export default Home;
