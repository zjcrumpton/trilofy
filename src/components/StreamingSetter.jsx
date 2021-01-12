import React from "react";
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import { StreamingConsumer } from "../contexts/streamingContext";

export default class StreamingSetter extends React.Component {
  render() {
    return (
      <StreamingConsumer>
        {({ currentStreamingPlatform, setStreamingPlatform }) => (
          <div className="centered-flex-container">
            <FaSpotify
              color={setStreamingColor(currentStreamingPlatform, "spotify")}
              onClick={() => setStreamingPlatform("spotify")}
              size={30}
              className="search-provider-logos"
            />
            <FaSoundcloud
              color={setStreamingColor(currentStreamingPlatform, "soundcloud")}
              onClick={() => setStreamingPlatform("soundcloud")}
              size={40}
              className="search-provider-logos"
            />
            <FaYoutube
              color={setStreamingColor(currentStreamingPlatform, "youtube")}
              onClick={() => setStreamingPlatform("youtube")}
              size={35}
              className="search-provider-logos"
            />
          </div>
        )}
      </StreamingConsumer>
    );
  }
}

const setStreamingColor = (currentPlatform, platform) => {
  return currentPlatform === `${platform}` ? "#00d4ff" : "#adbdcc";
};
