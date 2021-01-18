import React from "react";
import SideNav from "./SideNav";
import { Route } from "react-router-dom";
import Authentication from "./Authentication";
import Settings from "./Settings";
import Searchbar from "./Searchbar";
import Home from "./Home";
import AlbumPage from "../api/AlbumPage";

const Dashboard = () => {
  return (
    <div className="dashboard-offset">
      <SideNav />
      <Searchbar />
      <Route exact path="/dashboard" component={Authentication} />
      <Route exact path="/dashboard/settings" component={Settings} />
      <Route exact path="/dashboard/home" component={Home} />
      <Route path="/dashboard/album/:id" component={AlbumPage} />
    </div>
  );
};

export default Dashboard;
