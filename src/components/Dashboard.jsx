import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SideNav from "./SideNav";
import { Route } from "react-router-dom";
import Authentication from "./Authentication";
import Settings from "./Settings";
import Searchbar from "./Searchbar";
import Home from "./Home";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="dashboard-offset">
      <SideNav />
      <Searchbar />
      <Route exact path="/dashboard" component={Authentication} />
      <Route exact path="/dashboard/settings" component={Settings} />
      <Route exact path="/dashboard/home" component={Home} />
    </div>
  );
};

export default Dashboard;
