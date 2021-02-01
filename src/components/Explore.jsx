import React from "react";
import { setWindowPlatform } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";

const Explore = () => {
  const platform = useSelector((state) => state.windowPlatform);
  const dispatch = useDispatch();

  return (
    <div style={{ width: "200px", marginTop: "500px", marginLeft: "500px" }}>
      <p>this is the explore page</p>
      <h1>Platform is: {platform}</h1>

      <button
        style={{ marginTop: "100px" }}
        onClick={() => dispatch(setWindowPlatform("Spotify"))}
      >
        Spotify
      </button>

      <button
        style={{ marginTop: "100px" }}
        onClick={() => dispatch(setWindowPlatform("Soundcloud"))}
      >
        Soundcloud
      </button>

      <button style={{ marginTop: "100px" }}>YouTube</button>
    </div>
  );
};

export default Explore;
