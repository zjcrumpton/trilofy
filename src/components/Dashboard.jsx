import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import { Route } from "react-router-dom";
import Authentication from "./Authentication";
import Settings from "./Settings";
import Searchbar from "./Searchbar";
import Home from "./Home";
import AlbumPage from "../api/AlbumPage";
import Player from "../api/SpotifyPlayer";

const Dashboard = () => {
  return (
    <div className="dashboard-offset">
      <SideNav />
      <Searchbar />
      <Route exact path="/dashboard" component={Authentication} />
      <Route exact path="/dashboard/settings" component={Settings} />
      <Route exact path="/dashboard/home" component={Home} />
      <Route path="/dashboard/album/:id" component={AlbumPage} />
      <Player />
    </div>
  );
};

export default Dashboard;
