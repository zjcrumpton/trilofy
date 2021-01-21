import React, { useContext } from "react";
import StreamingContext from "../contexts/streamingContext";
import TailSpinLoader from "../components/ui/TailSpinLoader";
import useFetchByPlatform from "../hooks/useFetchByPlatform";
import SmallAlbum from "../components/ui/SmallAlbum";

const endpoints = {
  spotify: "https://api.spotify.com/v1/me/player/recently-played",
  soundcloud: "",
  youtube: "",
};

const RecentlyPlayed = () => {
  const { platform } = useContext(StreamingContext);
  const { loading, data } = useFetchByPlatform(endpoints[`${platform}`]);

  if (loading) {
    return <TailSpinLoader />;
  }

  const renderedAlbums = [];

  return (
    <div>
      <h1 className="release-header">Recently Played</h1>
      <div className="featured-list">
        {data["items"].map((item, index) => {
          const album = formatSpotifyAlbum(item);
          // Avoids rendering an album twice
          if (renderedAlbums.includes(album.name)) {
            return null;
          }
          renderedAlbums.push(album.name);
          return <SmallAlbum key={index} album={album} />;
        })}
      </div>
    </div>
  );
};

const formatSpotifyAlbum = (album) => {
  return {
    id: album["track"]["album"]["id"],
    name: album["track"]["album"]["name"],
    desc: album["track"]["artists"][0].name,
    src: album["track"]["album"]["images"][1]["url"],
  };
};

export default RecentlyPlayed;
