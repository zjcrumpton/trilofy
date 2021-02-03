const checkSpotifyToken = () => {
  let tokenObject = localStorage.getItem("spotifyToken");

  if (tokenObject) {
    tokenObject = JSON.parse(tokenObject);
    const expiresAt = Date.parse(tokenObject.expires_at);
    const now = Date.parse(new Date());

    if (now >= expiresAt) {
      console.log("Spotify Token expired");
      localStorage.removeItem("spotifyToken");
      return null;
    }

    return tokenObject.token;
  } else {
    return null;
  }
};

export default checkSpotifyToken;
