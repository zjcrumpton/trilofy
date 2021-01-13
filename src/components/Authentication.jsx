import React from "react";
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="auth-btn clickable" onClick={() => loginWithRedirect()}>
      Start now
    </button>
  );
};

export default class Authentication extends React.Component {
  render() {
    return (
      <div className="welcome-screen">
        <h1 className="login-logo">Trilofy</h1>
        <div className="trio-logos">
          <FaSpotify size="80" color="#1ed760" className="trio-logo" />
          <FaSoundcloud size="110" color="#f9550d" className="trio-logo" />
          <FaYoutube size="90" color="#ff0000" className="trio-logo" />
        </div>
        <h2 className="login-sub">Spotify - Soundcloud - Youtube</h2>
        <p className="login-desc">Hear all your music in one place.</p>
        <LoginButton>
          <Link to="/sign-up"></Link>
        </LoginButton>
      </div>
    );
  }
}
