import React from "react";

const TracklistItems = ({ tracks }) => {
  return tracks.map((track, i) => {
    const { track_number, name, artists, duration_ms } = track;
    let minutes = Math.floor(duration_ms / 60000);
    let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    let duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return (
      <tr className="hover-row" key={`item-${i}`}>
        <td className="gray-num">{track_number}</td>
        <td className="clickable">{name}</td>
        <td className="clickable artist-link">{artists[0].name}</td>
        <td>{duration}</td>
      </tr>
    );
  });
};

export default TracklistItems;
