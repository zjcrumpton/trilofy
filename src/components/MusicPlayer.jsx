import React, { useContext, useState, useRef, useEffect } from "react";
import StreamingContext from "../contexts/streamingContext";
import getCookie from "../utilities/cookies";
import TailSpinLoader from "./ui/TailSpinLoader";
import { addSpotifyEventListeners } from "../api/spotifyEvents";
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import { FaPlay, FaPause } from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {
  MdAirlineSeatIndividualSuite,
  MdRepeat,
  MdRepeatOne,
} from "react-icons/md";
import { startSpotifyPlayback } from "../api/spotifyPlayback";

const MusicPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("spotify");
  const [updating, setUpdating] = useState(false);
  const [duration, setDuration] = useState(0);
  const [trackData, setTrackData] = useState(null);
  const [update, setUpdate] = useState(0);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);

  const spotifyPlayer = useRef(null);

  const {
    setSpDeviceId,
    spDeviceId,
    currentSong,
    setCurrentSong,
    next,
    last,
    setNext,
    setLast,
    albumArray,
  } = useContext(StreamingContext);

  const timeoutId = useRef(null);

  useEffect(() => {
    console.log("using effect");
    if (spotifyPlayer.current !== null) {
      setInterval(() => {
        spotifyPlayer.current.getCurrentState().then((state) => {
          if (state && state.position) {
            if (state.paused) {
              setPaused(true);
            } else {
              setPaused(false);
              setPosition(state.position);
            }
          }
        });
      }, 1000);
    }

    if (platform === "spotify" && spotifyPlayer.current === null) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        handleLoadSuccess(window.Spotify);
      };
    }

    return () => {
      if (timeoutId.current) {
        if (timeoutId.current) {
          clearTimeout(timeoutId);
        }
      }
    };
  }, [platform, update, spotifyPlayer.current]);

  const handleLoadSuccess = (spotify) => {
    window.Spotify = spotify;
    spotifyPlayer.current = new window.Spotify.Player({
      name: "Trilofy",
      getOAuthToken: (cb) => {
        cb(getCookie("spotifyAccess"));
      },
    });
    addSpotifyEventListeners(spotifyPlayer.current, {
      setSpDeviceId,
      currentSong,
      setCurrentSong,
      updating,
      setUpdating,
      duration,
      setDuration,
      timeoutId,
      setTrackData,
      setLoading,
    });
  };

  if (loading) {
    return (
      <div className="music-player">
        <TailSpinLoader />
      </div>
    );
  }

  if (platform === "spotify" && trackData) {
    const { track_window } = trackData;
    const { current_track } = track_window;

    return (
      <div className="music-player">
        <img
          className="playing-art clickable"
          src={current_track.album.images[0].url}
          alt={`Cover art for ${current_track.name}`}
        ></img>
        <div className="playing-info">
          <h1 className="white">{current_track.name}</h1>
          <h3 className="gray blue-on-hover clickable">
            {current_track.artists[0].name}
          </h3>
        </div>

        <div className="controls-container">
          <div className="centered-flex-container main-controls space-around">
            <BiShuffle className="clickable gray blue-on-hover" size={20} />
            <AiFillStepBackward
              onClick={() => {
                if (last) {
                  setCurrentSong(last);
                  startSpotifyPlayback(spDeviceId, 0, [last]);
                  console.log(albumArray);
                  let playOrder = findSongOrder(albumArray, last);
                  if (playOrder.next !== null) {
                    console.log(playOrder);
                    setNext(playOrder.next);
                  }

                  if (playOrder.last !== null) {
                    setLast(playOrder.last);
                  }
                } else {
                  spotifyPlayer.current.previousTrack();
                }
              }}
              className="clickable gray blue-on-hover"
              size={20}
            />
            {paused ? (
              <FaPlay
                onClick={() => {
                  spotifyPlayer.current.togglePlay().then(() => {
                    setPaused(paused ? false : true);
                  });
                }}
                className="clickable white blue-on-hover"
                size={22}
              />
            ) : (
              <FaPause
                onClick={() => {
                  spotifyPlayer.current.togglePlay().then(() => {
                    setPaused(paused ? false : true);
                  });
                }}
                className="clickable white blue-on-hover"
                size={22}
              />
            )}

            <AiFillStepForward
              onClick={() => {
                if (next) {
                  // change current track to the track that is within the next variable
                  setCurrentSong(next);
                  startSpotifyPlayback(spDeviceId, 0, [next]);
                  console.log(albumArray);
                  let playOrder = findSongOrder(albumArray, next);
                  if (playOrder.next !== null) {
                    console.log(playOrder);
                    setNext(playOrder.next);
                  }

                  if (playOrder.last !== null) {
                    setLast(playOrder.last);
                  }
                } else {
                  spotifyPlayer.current.nextTrack();
                }
              }}
              className="clickable gray blue-on-hover"
              size={20}
            />
            <MdRepeat className="clickable gray blue-on-hover" size={20} />
          </div>
          <div className="progress-wrapper">
            <div
              className="progress-bar"
              style={{
                width: `${(position / current_track.duration_ms) * 100}%`,
                borderRadius: "100px",
                height: "5px",
              }}
            ></div>
          </div>
        </div>

        <FaSpotify color="#17d85d" size={40} style={{ marginRight: "20px" }} />
      </div>
    );
  }

  return <div className="music-player">No Platform selected</div>;
};

export default MusicPlayer;

const findSongOrder = (album, id) => {
  if (album.length === 1) {
    return { last: album[0], next: album[0] };
  }

  let last;
  let next;

  for (let i = 0; i < album.length; i++) {
    if (album[i].uri === id) {
      if (album[i - 1]) {
        last = album[i - 1].uri;
      } else {
        last = null;
      }

      if (album[i + 1]) {
        next = album[i + 1].uri;
      } else {
        next = null;
      }

      return { last: last, next: next };
    }
  }

  return { last: null, next: null };
};
