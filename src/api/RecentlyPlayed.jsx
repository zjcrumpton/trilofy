import React from "react";
import StreamingContext, {
  StreamingConsumer,
} from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import Loader from "react-loader-spinner";

const RecentlyPlayed = () => {
  const streamingContext = React.useContext(StreamingContext);

  const [recentArray, setRecentArray] = React.useState(null);

  const spotifyExpirationHandler = (json) => {
    if (json.hasOwnProperty("error")) {
      if (json["error"]["status"] === 401) {
        streamingContext.updateSpotifyLogin(false);
        return null;
      }
    }
  };

  React.useEffect(() => {
    fetchRecentlyPlayed().then((json) => {
      spotifyExpirationHandler(json);
      const items = json["items"];
      setRecentArray(items);
    });
    return () => {
      setRecentArray(null);
    };
  }, []);

  if (recentArray === null) {
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

  const renderedAlbums = [];

  return (
    <div>
      <h1 className="release-header">Recently Played</h1>
      <div className="featured-list" style={{ color: "red" }}>
        {recentArray.map((item, index) => {
          if (renderedAlbums.includes(item["track"]["album"]["name"])) {
            return null;
          } else {
            renderedAlbums.push(item["track"]["album"]["name"]);
            return (
              <div key={index} className="recent-card">
                <img
                  className="recent-image clickable"
                  src={item["track"]["album"]["images"][1]["url"]}
                  alt={`Cover art for ${item["track"]["album"]["name"]}`}
                ></img>
                <h3 className="recent-title clickable">
                  {item["track"]["album"]["name"]}
                </h3>
                <h3 className="recent-credits clickable">
                  {item["track"]["artists"][0].name}
                </h3>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const fetchRecentlyPlayed = () =>
  fetch("https://api.spotify.com/v1/me/player/recently-played", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("spotifyAccess")}`,
    },
  }).then((resp) => resp.json());

export default RecentlyPlayed;
