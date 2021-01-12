import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SpotifyLogin from "./streamingPlatformLogins/spotifyLogin";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: "http://localhost:3000" })}>
      Log Out
    </button>
  );
};

const Settings = () => {
  return (
    <div className="settings">
      <SpotifyLogin />
      <LogoutButton />
    </div>
  );
};

export default Settings;
