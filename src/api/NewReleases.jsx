import React, { useContext } from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import TailSpinLoader from "../components/ui/TailSpinLoader";
import MedAlbum from "../components/ui/MedAlbum";
import useFetchByPlatform from "../hooks/useFetchByPlatform";

const endpoints = {
  spotify: "https://api.spotify.com/v1/browse/new-releases",
  soundcloud: "",
  youtube: "",
};

const NewReleases = () => {
  const { platform } = useContext(StreamingContext);
  const { loading, data } = useFetchByPlatform(endpoints[`${platform}`]);

  if (loading) {
    return <TailSpinLoader />;
  }

  // console.log(data);

  return (
    <div>
      <h1 className="release-header">New Releases</h1>
      <div className="featured-list">
        {data["albums"]["items"].map((item, index) => {
          const album = formatSpotifyAlbum(item);
          return <MedAlbum key={index} album={album} />;
        })}
      </div>
    </div>
  );
};

const formatSpotifyAlbum = (album) => {
  return {
    name: album["name"],
    type: album["album_type"],
    desc: album["artists"][0].name,
    src: album["images"][0]["url"],
  };
};

export default NewReleases;
