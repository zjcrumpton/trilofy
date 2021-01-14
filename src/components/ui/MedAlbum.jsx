import React from "react";

const MedAlbum = ({ album }) => {
  const { name, desc, src, type } = album;

  return (
    <div className="release-card">
      <img
        className="release-image clickable"
        src={src}
        alt={`Cover art for ${name}`}
      ></img>
      <h3 className="release-type">NEW {`${type.toUpperCase()}`}</h3>
      <h3 className="release-title clickable">{name}</h3>
      <h3 className="release-credits clickable">{desc}</h3>
    </div>
  );
};

export default MedAlbum;
