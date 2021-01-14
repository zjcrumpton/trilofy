import React from "react";

const ArtistPic = ({ artist }) => {
  const { src, name } = artist;

  return (
    <div className="recent-card">
      <img
        className="recent-image clickable face-pic"
        src={src}
        alt={`Picture of ${name}'s face`}
      ></img>
      <h3 className="top-artist-name clickable">{name}</h3>
    </div>
  );
};

export default ArtistPic;
