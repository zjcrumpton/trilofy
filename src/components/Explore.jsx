import React from "react";
import { connect } from "react-redux";
import { setWindowPlatform } from "../actions/actions";

const Explore = ({ windowPlatform, state, updateWindowPlatform }) => {
  console.log(state);
  console.log(setWindowPlatform("sc"));
  return (
    <div style={{ width: "200px", marginTop: "500px", marginLeft: "500px" }}>
      <p>this is the explore page</p>
      <h1>Platform is: {windowPlatform}</h1>

      <button
        style={{ marginTop: "100px" }}
        onClick={() => updateWindowPlatform("Spotify")}
      >
        Spotify
      </button>

      <button
        style={{ marginTop: "100px" }}
        onClick={() => updateWindowPlatform("Soundcloud")}
      >
        Soundcloud
      </button>

      <button
        style={{ marginTop: "100px" }}
        onClick={() => updateWindowPlatform("YouTube")}
      >
        YouTube
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    windowPlatform: state.windowPlatform,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWindowPlatform: (platform) => dispatch(setWindowPlatform(platform)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
