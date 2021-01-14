import React, { useContext } from "react";
import ArtistPic from "../components/ui/ArtistPic";
import useFetchByPlatform from "../hooks/useFetchByPlatform";
import TailSpinLoader from "../components/ui/TailSpinLoader";
import StreamingContext from "../contexts/streamingContext";

const endpoints = {
  spotify: "https://api.spotify.com/v1/me/top/artists",
  soundcloud: "",
  youtube: "",
};

const TopArtists = () => {
  const { platform } = useContext(StreamingContext);

  const { loading, data } = useFetchByPlatform(endpoints[`${platform}`]);

  if (loading) {
    return <TailSpinLoader />;
  }

  return (
    <div>
      <h1 className="release-header">My Top Artists</h1>
      <div className="featured-list">
        {data["items"].map((item, index) => {
          const artist = formatSpotifyArtist(item);

          return <ArtistPic key={index} artist={artist} />;
        })}
      </div>
    </div>
  );
};

const formatSpotifyArtist = (artist) => {
  return {
    name: artist["name"],
    src: artist["images"][1]["url"],
  };
};

export default TopArtists;
