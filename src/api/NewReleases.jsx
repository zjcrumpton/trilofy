import React from "react";
import StreamingContext, {
  StreamingConsumer,
} from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import Loader from "react-loader-spinner";

const NewReleases = () => {
  const streamingContext = React.useContext(StreamingContext);

  const [releaseArray, setReleaseArray] = React.useState(null);

  const spotifyExpirationHandler = (json) => {
    console.log(json);
    if (json.hasOwnProperty("error")) {
      if (json["error"]["status"] === 401) {
        console.log(json["error"]["message"]);
        streamingContext.updateSpotifyLogin(false);
        return (window.location.href = "localhost:3000/dashboard/settings/");
      }
    }
  };

  React.useEffect(() => {
    // Prevents infinite loop until I understand this hook better
    if (releaseArray !== null) {
      return null;
    }

    fetchNewReleases().then(
      (json) => {
        spotifyExpirationHandler(json);
        const items = json["albums"]["items"];
        console.log(items);
        setReleaseArray(items);
      },
      [releaseArray]
    );
  });

  if (releaseArray === null) {
    return (
      <Loader
        type="Puff"
        color="#adbdcc"
        height={100}
        width={100}
        className="centered-loader"
      />
    );
  }

  return (
    <div>
      <h1 className="release-header">New Releases</h1>
      <div className="featured-list" style={{ color: "red" }}>
        {releaseArray.map((item, index) => {
          return (
            <div key={index} className="release-card">
              <img
                className="release-image clickable"
                src={item["images"][1]["url"]}
                alt={`Cover art for ${item["name"]}`}
              ></img>
              <h3 className="release-type">
                NEW {`${item["album_type"].toUpperCase()}`}
              </h3>
              <h3 className="release-title clickable">{item["name"]}</h3>
              <h3 className="release-credits clickable">
                {item["artists"][0].name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const fetchNewReleases = () =>
  fetch("https://api.spotify.com/v1/browse/new-releases", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("spotifyAccess")}`,
    },
  }).then((resp) => resp.json());

export default NewReleases;
