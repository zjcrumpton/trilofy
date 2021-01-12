import React from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";

const Home = () => {
  const streamingContext = React.useContext(StreamingContext);

  if (streamingContext.spotifyLoggedIn !== isSpotifyActive()) {
    streamingContext.updateSpotifyLogin(isSpotifyActive());
  }

  return streamingContext.spotifyLoggedIn ? (
    <div>Logged In</div>
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
