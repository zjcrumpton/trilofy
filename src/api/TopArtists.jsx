import React from "react";
import getCookie from "../utilities/cookies";
import Loader from "react-loader-spinner";

const TopArtists = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    fetchTopArtists().then((json) => {
      setItems(json["items"]);
      setLoading(false);
    });
  }, []);

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

  return (
    <div>
      <h1 className="release-header">My Top Artists</h1>
      <div className="featured-list">
        {items.map((item, index) => {
          return (
            <div key={index} className="recent-card">
              <img
                className="recent-image clickable face-pic"
                src={item["images"][1]["url"]}
                alt={`Picture of ${item["name"]}'s face`}
              ></img>
              <h3 className="top-artist-name clickable">{item["name"]}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const fetchTopArtists = () =>
  fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("spotifyAccess")}`,
    },
  }).then((resp) => resp.json());

export default TopArtists;
