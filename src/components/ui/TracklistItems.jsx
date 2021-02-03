import React, { useState, useContext, useEffect } from "react";
import StreamingContext from "../../contexts/streamingContext";
import { FaPlay } from "react-icons/fa";
import { startSpotifyPlayback } from "../../api/spotifyPlayback";
import { BsSpeaker } from "react-icons/bs";

const TracklistItems = ({ tracks }) => {
  return tracks.map((track, i) => (
    <TrackItem track={track} index={i} album={tracks} />
  ));
};

const TrackItem = ({ track, index, album }) => {
  const [hovering, setHovering] = useState(false);
  const {
    spDeviceId,
    setNext,
    setLast,
    currentSong,
    setCurrentSong,
    setAlbumArray,
    setSpUris,
  } = useContext(StreamingContext);

  const toggleHover = () => {
    hovering ? setHovering(false) : setHovering(true);
  };

  const playSong = () => {
    startSpotifyPlayback(spDeviceId, 0, [uri]).then(() => {
      setCurrentSong(uri);
      setAlbumArray(album);
      setSpUris(null);
    });
    if (index < album.length - 1) {
      setNext(album[index + 1].uri);
    } else {
      setNext(album[0].uri);
    }
    if (index > 0) {
      setLast(album[index - 1].uri);
    } else {
      setLast(album[0].uri);
    }
  };

  useEffect(() => {
    console.log(currentSong);
  }, [currentSong]);

  const { track_number, name, artists, duration_ms, uri } = track;

  let minutes = Math.floor(duration_ms / 60000);
  let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  let duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  return (
    <tr
      className="hover-row"
      key={`item-${index}`}
      onMouseEnter={() => toggleHover()}
      onMouseLeave={() => toggleHover()}
    >
      <td className="gray-num">
        {hovering ? (
          <FaPlay
            onClick={() => playSong()}
            className="clickable vert-centered"
            color="white"
            size={13}
          />
        ) : uri === currentSong ? (
          <BsSpeaker size={13} />
        ) : (
          track_number
        )}
      </td>
      {uri === currentSong ? (
        <td className="clickable blue" onClick={() => playSong()}>
          {name}
        </td>
      ) : (
        <td className="clickable" onClick={() => playSong()}>
          {name}
        </td>
      )}
      <td className="clickable artist-link">{artists[0].name}</td>
      <td>{duration}</td>
    </tr>
  );
};

export default TracklistItems;
