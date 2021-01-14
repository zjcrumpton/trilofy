import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import getCookie from "../utilities/cookies";

const FeaturedPlaylists = () => {
  const [loading, setLoading] = React.useState(true);
  const [playlists, setPlaylists] = React.useState(null);

  useEffect(() => {
    fetchFeaturedPlaylists.then((json) => {
      setPlaylists(json["playlists"]["items"]);
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

  console.log(playlists);

  return (
    <div>
      <h1 className="release-header">Featured Playlists</h1>
      <div className="featured-list">
        {playlists.map((p, index) => {
          // Temporary fix for html included in some titles
          if (p["description"].includes("<a")) {
            return null;
          }

          return (
            <div key={index} className="recent-card">
              <img
                className="recent-image clickable"
                src={p["images"][0]["url"]}
                alt={`Cover art for ${p["name"]}`}
              ></img>
              <h3 className="recent-title clickable">{p["name"]}</h3>
              <h3 className="recent-credits clickable">{p["description"]}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const fetchFeaturedPlaylists = fetch(
  "https://api.spotify.com/v1/browse/featured-playlists?locale=en_US",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("spotifyAccess")}`,
    },
  }
).then((resp) => resp.json());

export default FeaturedPlaylists;
