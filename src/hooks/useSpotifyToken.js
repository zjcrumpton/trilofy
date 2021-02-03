import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSpotifyToken } from "../actions/actions";

const useSpotifyToken = () => {
  const token = useSelector((state) => state.spotifyToken);
  const dispatch = useDispatch();

  const [tokenState, setTokenState] = useState(token);

  //   useEffect(() => {
  //     if (token) {
  //       let tokenObject = localStorage.getItem("spotifyToken");
  //       if (tokenObject) {
  //         tokenObject = JSON.parse(tokenObject);
  //         const expiresAt = Date.parse(tokenObject.expires_at);
  //         const now = Date.parse(new Date());

  //         if (now >= expiresAt) {
  //           localStorage.removeItem("spotifyToken");
  //           setTokenState(null);
  //         }
  //       }
  //     }
  //   }, [token, tokenState]);

  console.log(`setting token state to: ${tokenState}`);
  dispatch(setSpotifyToken(tokenState));

  return [token, setTokenState];
};

export default useSpotifyToken;
