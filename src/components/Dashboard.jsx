import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SideNav from "./SideNav";
import { Route } from "react-router-dom";
import Authentication from "./Authentication";
import Settings from "./Settings";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <SideNav />
      <div className="search-nav">
        <FaSearch size={25} color="#adbdcc" className="search-icon" />
        <input type="text" placeholder="Search" className="search-bar" />
      </div>
      <Route exact path="/dashboard" component={Authentication} />
      <Route exact path="/dashboard/settings" component={Settings} />
    </div>
  );
};

export default Dashboard;
