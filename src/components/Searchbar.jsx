import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";

const Searchbar = () => {
  return (
    <form>
      <div className="search-nav">
        <FaSearch size={25} color="#adbdcc" className="search-icon" />
        <input type="text" placeholder="Search" className="search-bar" />
        <input type="reset" value="X" className="reset-search"></input>
        <FaSpotify size={30} className="search-provider-logos" />
        <FaSoundcloud size={30} className="search-provider-logos" />
        <FaYoutube size={30} className="search-provider-logos" />
      </div>
    </form>
  );
};

export default Searchbar;
