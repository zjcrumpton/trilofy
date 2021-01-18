import React, { useContext } from "react";
import { Link } from "react-router-dom";

const SmallAlbum = ({ album }) => {
  const { id, name, desc, src } = album;

  return (
    <div className="recent-card">
      <Link to={`/dashboard/album/${id}`} className="clean-link">
        <img
          className="recent-image clickable"
          src={src}
          alt={`Cover art for ${name}`}
        ></img>
        <h3 className="recent-title clickable">{name}</h3>
      </Link>

      <h3 className="recent-credits clickable">{desc}</h3>
    </div>
  );
};

export default SmallAlbum;
