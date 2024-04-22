import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars} from "react-icons/fa";

import logo_dall_e3 from "../../assets/images/background_img/logo_dall_e3.jpg";
import SearchBar from "../header/SearchBar";
import toogle_light from "../../assets/images/icons/night.png";
import toogle_dark from "../../assets/images/icons/day.png";

import "../../assets/styles/components/header/NavBar.css";

function NavBar({theme, setTheme}) {
  const location = useLocation();
  const showSearchBar = useMemo(() => {
    return location.pathname !== "/about";
  }, [location.pathname]);

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    theme === 'light' ? setTheme('dark') : setTheme('light');
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
        {showSearchBar && <SearchBar onSearch={handleSearch} theme={theme} setTheme={setTheme}/>}
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
        <div className="navigations">
          <ul>
            <li>
              <img src={theme === 'light' ? toogle_light : toogle_dark} alt="light_mode" className="toogle-icon" onClick={()=>{toggleDarkMode()}} title="Dark/Light mode"/>
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
          <img src={theme === 'light' ? toogle_light : toogle_dark} alt="light_mode" className="toogle-icon" onClick={()=>{toggleDarkMode()}} title="Dark/Light mode"/>
          </li>
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
