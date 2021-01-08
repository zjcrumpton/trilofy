import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiPlayListLine as Playlist } from "react-icons/ri";
import {
  FaRecordVinyl as Record,
  FaMusic as Song,
  FaHeadphones as Headphones,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const activeStyle = {
  color: "#00d4ff",
};

const SideNav = () => {
  const { pathname } = useLocation();
  return (
    <div className="sidenav">
      <div className="side-container-flex">
        <div className="centered-flex-container dashboard-profile">
          <Headphones size={30} color="#adbdcc" />
          <h1 className="dashboard-logo">zjcrumpton</h1>

          <NavLink
            exact
            to="/dashboard/settings"
            activeStyle={activeStyle}
            className="nav-link"
          >
            <BsThreeDots
              size={30}
              color={pathname === "/dashboard/settings" ? "#00d4ff" : "#adbdcc"}
              className="settings-dots"
            />
          </NavLink>
        </div>

        <NavLink
          exact
          to="/dashboard/home"
          activeStyle={activeStyle}
          className="nav-home nav-link"
        >
          Home
        </NavLink>

        <NavLink
          exact
          to="/dashboard/explore"
          activeStyle={activeStyle}
          className="nav-search nav-link"
        >
          Explore
        </NavLink>

        <NavLink
          exact
          to="/dashboard/battle"
          activeStyle={activeStyle}
          className="nav-search nav-link"
        >
          Battle
        </NavLink>

        <NavLink
          exact
          to="/dashboard/party"
          activeStyle={activeStyle}
          className="nav-search nav-link"
        >
          Party
        </NavLink>

        <h2 className="my-collection">MY COLLECTION</h2>

        <div className="centered-flex-container dashboard-profile nav-indent">
          <Playlist
            size={25}
            color={pathname === "/dashboard/playlists" ? "#00d4ff" : "#adbdcc"}
          />

          <NavLink
            exact
            to="/dashboard/playlists"
            activeStyle={activeStyle}
            className="c-link playlist-link"
          >
            Playlists
          </NavLink>
        </div>

        <div className="centered-flex-container dashboard-profile nav-indent">
          <Record
            size={25}
            color={pathname === "/dashboard/albums" ? "#00d4ff" : "#adbdcc"}
          />

          <NavLink
            exact
            to="/dashboard/albums"
            activeStyle={activeStyle}
            className="c-link playlist-link"
          >
            Albums
          </NavLink>
        </div>

        <div className="centered-flex-container dashboard-profile nav-indent">
          <Song
            size={25}
            color={pathname === "/dashboard/songs" ? "#00d4ff" : "#adbdcc"}
          />

          <NavLink
            exact
            to="/dashboard/songs"
            activeStyle={activeStyle}
            className="c-link playlist-link"
          >
            Songs
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
