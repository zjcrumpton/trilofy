import React from "react";

const SmallAlbum = ({ album }) => {
  const { name, desc, src } = album;

  return (
    <div className="recent-card">
      <img
        className="recent-image clickable"
        src={src}
        alt={`Cover art for ${name}`}
      ></img>
      <h3 className="recent-title clickable">{name}</h3>
      <h3 className="recent-credits clickable">{desc}</h3>
    </div>
  );
};

export default SmallAlbum;
