import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import { Route } from "react-router-dom";
import Authentication from "./Authentication";
import Settings from "./Settings";
import Searchbar from "./Searchbar";
import Home from "./Home";
import AlbumPage from "../api/AlbumPage";
import MusicPlayer from "./MusicPlayer";
import Explore from "./Explore";

const Dashboard = () => {
  return (
    <div className="dashboard-offset">
      <SideNav />
      <Searchbar />
      <Route exact path="/dashboard" component={Authentication} />
      <Route exact path="/dashboard/settings" component={Settings} />
      <Route exact path="/dashboard/home" component={Home} />
      <Route path="/dashboard/album/:id" component={AlbumPage} />
      <Route exact path="/dashboard/explore" component={Explore} />
      <MusicPlayer />
    </div>
  );
};

export default Dashboard;
