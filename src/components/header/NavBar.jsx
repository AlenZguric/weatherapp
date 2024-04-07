import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import logo_dall_e3 from "../../assets/images/background_img/logo_dall_e3.jpg";
import SearchBar from "./SearchBar";

import "../../assets/style/header/NavBar.css";

function NavBar() {
  
  const location = useLocation();
  const showSearchBar = useMemo(() => {
    return location.pathname !== "/about";
  }, [location.pathname]);

  const handleSearch = (searchTerm) => {
    // Ovdje možete postaviti logiku za pretraživanje
    console.log("Search term:", searchTerm);
  };

  useEffect(() => {});

  return (
    <div className="navBar">
      <div className="group">
        <div className="logo">
          <Link to="/">
            <div className="logo_img">
              <img src={logo_dall_e3} alt="logo" />
            </div>
          </Link>
        </div>
        {showSearchBar && <SearchBar onSearch={handleSearch} />}
        <div className="navigations">
          <Link to="/">Home</Link>
          <Link to="/myplaces">My Places</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
