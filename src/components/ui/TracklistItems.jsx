import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const TracklistItems = ({ tracks }) => {
  return tracks.map((track, i) => <TrackItem track={track} index={i} />);
};

const TrackItem = ({ track, index }) => {
  const [hovering, setHovering] = useState(false);

  const toggleHover = () => {
    hovering ? setHovering(false) : setHovering(true);
  };

  const { track_number, name, artists, duration_ms } = track;
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
          <FaPlay className="clickable vert-centered" color="white" size={13} />
        ) : (
          track_number
        )}
      </td>
      <td className="clickable">{name}</td>
      <td className="clickable artist-link">{artists[0].name}</td>
      <td>{duration}</td>
    </tr>
  );
};

export default TracklistItems;
