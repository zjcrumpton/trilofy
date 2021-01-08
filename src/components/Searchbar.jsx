import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <form>
      <div className="search-nav">
        <FaSearch size={25} color="#adbdcc" className="search-icon" />
        <input type="text" placeholder="Search" className="search-bar" />
        <input type="reset" value="X" className="reset-search"></input>
      </div>
    </form>
  );
};

export default Searchbar;
