import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars} from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import logo_dall_e3 from "../../assets/images/background_img/logo_dall_e3.jpg";
import SearchBar from "../header/SearchBar";

import "../../assets/styles/components/header/NavBar.css";

function NavBar() {
  const location = useLocation();
  const showSearchBar = useMemo(() => {
    return location.pathname !== "/about";
  }, [location.pathname]);

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [isTablet, setIsTablet] = useState(
  //   window.innerWidth >= 769 && window.innerWidth <= 1024
  // );

  // useEffect(() => {
  //   const handleResize = () => {
  //     const windowWidth = window.innerWidth;
  //     setIsMobile(windowWidth < 768);
  //     setIsTablet(windowWidth >= 769 && windowWidth < 1024);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDarkMode = ( )=>{
    setIsDarkMode(!isDarkMode);
  }

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
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
        <div className="navigations">
          <ul>
            <li>
            {isDarkMode ? <MdDarkMode onClick={toggleDarkMode}/> : <MdLightMode onClick={toggleDarkMode}/> }
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/myplaces">My Places</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`dropdown-content${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/myplaces" onClick={toggleMenu}>
              My Places
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={toggleMenu}>
              Favorites
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
}

export default NavBar;
