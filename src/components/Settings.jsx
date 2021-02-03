import React from "react";
import SpotifyLogin from "./streamingPlatformLogins/spotifyLogin";

const Settings = () => {
  return (
    <div className="dashboard-panel">
      <SpotifyLogin redirectUri="http://localhost:3000/dashboard/settings" />
    </div>
  );
};

export default Settings;
