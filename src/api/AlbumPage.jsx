import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchByPlatform from "../hooks/useFetchByPlatform";
import StreamingContext from "../contexts/streamingContext";
import TailSpinLoader from "../components/ui/TailSpinLoader";
import { FaPlay } from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiFillInfoCircle as Info } from "react-icons/ai";
import Tracklist from "../components/ui/Tracklist";

const endpoints = {
  spotify: "https://api.spotify.com/v1/albums",
  soundcloud: "",
  youtube: "",
};

const AlbumPage = () => {
  const { id } = useParams();
  const { platform } = useContext(StreamingContext);
  const { loading, data } = useFetchByPlatform(`${endpoints[platform]}/${id}`);
  const [saved, setSaved] = useState(false);

  const ToggleSave = () => {
    console.log(saved);
    saved ? setSaved(false) : setSaved(true);
    console.log(saved);
  };

  if (loading) {
    return <TailSpinLoader />;
  }

  console.log(data);

  const { images, name, release_date, artists, tracks } = data;

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
        <div className="album-nav">
          <button className="album-nav-btn clickable">
            <div className="btn-content">
              <FaPlay color="#111b24" />
              <div className="ml-10">Play</div>
            </div>
          </button>
          <button className="album-nav-btn clickable">
            <div className="btn-content">
              <BiShuffle size={25} color="#111b24" />{" "}
              <div className="ml-10">Shuffle</div>
            </div>
          </button>
          <button
            className="album-add-btn clickable"
            onClick={() => ToggleSave()}
          >
            {saved ? (
              <BsHeartFill size={30} color="#00d4ff" />
            ) : (
              <BsHeart size={30} />
            )}
          </button>
          <button className="album-credits-btn clickable">
            <Info color="adbdcc" size={35} />
          </button>
        </div>

        <Tracklist tracks={tracks.items} />
      </div>
    </React.Fragment>
  );
};

export default AlbumPage;
