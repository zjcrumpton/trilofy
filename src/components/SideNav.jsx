import React from "react";
import { MdFace } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { NavLink, Redirect, useLocation } from "react-router-dom";

const activeStyle = {
  color: "#00d4ff",
};

const SideNav = () => {
  const { pathname } = useLocation();
  return (
    <div className="sidenav">
      <div className="side-container-flex">
        <div className="centered-flex-container dashboard-profile">
          <MdFace size={30} color="#adbdcc" />
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
      </div>
    </div>
  );
};

export default SideNav;
