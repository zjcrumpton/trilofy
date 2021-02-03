import { useEffect, useState, useContext } from "react";
import StreamingContext from "../contexts/streamingContext";
import checkSpotifyToken from "../api/spotifyAuth";

const useFetchByPlatform = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { platform, updateSpotifyLogin, logoutSpotify } = useContext(
    StreamingContext
  );

  const fetchFromSpotify = (url) => {
    if (!checkSpotifyToken()) {
      return new Promise(() => {
        setLoading(false);
        setData("expired_token");
        setError("expired_token");
        return "expired-token";
      });
    }

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${checkSpotifyToken()}`,
      },
    })
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          return Promise.resolve(resp);
        } else {
          return Promise.reject(resp);
        }
      })
      .then((resp) => resp.json())
      .catch((e) => {
        setLoading(true);
        setData(null);
        setError(e);
        return Promise.reject(e);
      });
  };

  const handleSpotifyError = (error) => {
    const { status } = error;
    setLoading(true);

    console.log(error);

    if (status === 401 || status === 403) {
      console.log("Unauthorized");
      updateSpotifyLogin(false);
      logoutSpotify();
    }
  };

  useEffect(() => {
    switch (platform) {
      case "spotify":
        fetchFromSpotify(url)
          .then((data) => {
            setData(data);
            setError(null);
            setLoading(false);
          })
          .catch((e) => handleSpotifyError(e));
        break;
      default:
    }
  }, [platform, url]);

  return {
    loading,
    data,
    error,
  };
};

export default useFetchByPlatform;
