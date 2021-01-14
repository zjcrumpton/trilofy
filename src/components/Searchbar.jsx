import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import StreamingSetter from "./StreamingSetter";

const Searchbar = () => {
  return (
    <form>
      <div className="search-nav sticky">
        <FaSearch size={25} color="#adbdcc" className="search-icon" />
        <input type="text" placeholder="Search" className="search-bar" />
        <input type="reset" value="X" className="reset-search"></input>
        <StreamingSetter />
      </div>
    </form>
  );
};

export default Searchbar;
