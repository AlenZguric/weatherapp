import React from "react";
import { Link } from "react-router-dom";
import logo_dall_e3 from "../../assets/images/background_img/logo_dall_e3.jpg";

import "../../assets/style/header/NavBar.css";

function NavBar() {
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
        <div className="search">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
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
