import React from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import NewReleases from "../api/NewReleases";
import RecentlyPlayed from "../api/RecentlyPlayed";
import SpotifyLogin from "./streamingPlatformLogins/spotifyLogin";
import TopArtists from "../api/TopArtists";
import Loader from "react-loader-spinner";
import FeaturedPlaylists from "../api/FeaturedPlaylists";

const Home = () => {
  const streamingContext = React.useContext(StreamingContext);
  const [spotifyLoggedIn, setSpotifyLoggedIn] = React.useState(
    isSpotifyActive()
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (streamingContext.spotifyLoggedIn !== spotifyLoggedIn) {
      setSpotifyLoggedIn(isSpotifyActive());
      streamingContext.updateSpotifyLogin(spotifyLoggedIn);
    }

    setLoading(false);
  }, [streamingContext, spotifyLoggedIn]);

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

  if (!spotifyLoggedIn && streamingContext.platform === "spotify") {
    return loggedOutNotice();
  }

  if (streamingContext.platform === "spotify") {
    return (
      <div className="dashboard-panel">
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
