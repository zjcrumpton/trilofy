import { useEffect, useState, useContext } from "react";
import getCookie from "../utilities/cookies";
import StreamingContext from "../contexts/streamingContext";

const useFetchByPlatform = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { platform, updateSpotifyLogin, logoutSpotify } = useContext(
    StreamingContext
  );

  const fetchFromSpotify = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("spotifyAccess")}`,
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

  const handleSpotifyError = (error) => {
    const { status } = error;

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
