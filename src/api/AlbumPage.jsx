import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useFetchByPlatform from "../hooks/useFetchByPlatform";
import StreamingContext from "../contexts/streamingContext";
import TailSpinLoader from "../components/ui/TailSpinLoader";

const endpoints = {
  spotify: "https://api.spotify.com/v1/albums",
  soundcloud: "",
  youtube: "",
};

const AlbumPage = () => {
  const { id } = useParams();
  const { platform } = useContext(StreamingContext);
  const { loading, data } = useFetchByPlatform(`${endpoints[platform]}/${id}`);

  if (loading) {
    return <TailSpinLoader />;
  }

  console.log(data);

  const { images, name, release_date, artists } = data;

  return (
    <React.Fragment>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="dashboard-panel">
        <div className="album-info">
          <img className="album-cover" src={images[0]["url"]}></img>
          <div className="title-section">
            <h1 className="album-page-title">{name}</h1>
            <h2 className="album-page-artist clickable">
              {artists[0]["name"]}
            </h2>
            <h2 className="album-page-date">{release_date.split("-")[0]}</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AlbumPage;
