import React, { useContext } from "react";
import TailSpinLoader from "../components/ui/TailSpinLoader";
import useFetchByPlatform from "../hooks/useFetchByPlatform";
import StreamingContext from "../contexts/streamingContext";
import SmallAlbum from "../components/ui/SmallAlbum";

const endpoints = {
  spotify: "https://api.spotify.com/v1/browse/featured-playlists?locale=en_US",
  soundcloud: "",
  youtube: "",
};

const FeaturedPlaylists = () => {
  const { platform } = useContext(StreamingContext);

  const { loading, data, error } = useFetchByPlatform(endpoints[`${platform}`]);

  if (loading) {
    return <TailSpinLoader />;
  }

  return (
    <div>
      <h1 className="release-header">Featured Playlists</h1>
      <div className="featured-list">
        {data["playlists"]["items"].map((p, index) => {
          const playlist = formatSpotifyPlaylist(p);

          // Removes playlists with links in their descriptions
          if (playlist.desc.includes("<a")) {
            return null;
          }

          return <SmallAlbum key={index} album={playlist} />;
        })}
      </div>
    </div>
  );
};

const formatSpotifyPlaylist = (playlist) => {
  return {
    name: playlist["name"],
    desc: playlist["description"],
    src: playlist["images"][0]["url"],
  };
};

export default FeaturedPlaylists;
