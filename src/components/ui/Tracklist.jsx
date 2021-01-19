import React from "react";
import TracklistItems from "./TracklistItems";

const Tracklist = ({ tracks }) => {
  return (
    <div className="album-tracklist">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>TITLE</th>
            <th>ARTIST</th>
            <th>TIME</th>
          </tr>
        </thead>
        <tbody>
          <TracklistItems tracks={tracks} />
        </tbody>
      </table>
    </div>
  );
};

export default Tracklist;
