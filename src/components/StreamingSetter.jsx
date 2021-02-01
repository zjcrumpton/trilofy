import React from "react";
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import { setPlayerPlatform } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";

const StreamingSetter = () => {
  const platform = useSelector((state) => state.playerPlatform);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="centered-flex-container">
        <FaSpotify
          color={setStreamingColor(platform, "spotify")}
          onClick={() => dispatch(setPlayerPlatform("spotify"))}
          size={30}
          className="search-provider-logos clickable"
        />
        <FaSoundcloud
          color={setStreamingColor(platform, "soundcloud")}
          onClick={() => dispatch(setPlayerPlatform("soundcloud"))}
          size={40}
          className="search-provider-logos clickable"
        />
        <FaYoutube
          color={setStreamingColor(platform, "youtube")}
          onClick={() => dispatch(setPlayerPlatform("youtube"))}
          size={35}
          className="search-provider-logos clickable"
        />
      </div>
    </React.Fragment>
  );
};

const setStreamingColor = (currentPlatform, platform) => {
  return currentPlatform === `${platform}` ? "#00d4ff" : "#adbdcc";
};

export default StreamingSetter;
