import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../../assets/styles/components/header/SearchBar.css";

const SearchBar = () => {
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 769 && window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 768);
      setIsTablet(windowWidth >= 769 && windowWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    if (cityName.trim() !== "") {
      // Navigacija na "/myplaces" s unesenim gradom kao parametrom
      navigate(`/citys/${cityName.trim()}`);

      setCityName("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();

      setCityName("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search city by name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete="on"
      />
      {!(isMobile || isTablet) &&<button onClick={handleSearch}>Search</button>}
     {(isMobile || isTablet) && <FaSearch onClick={handleSearch}></FaSearch>}
    </div>
  );
};

export default SearchBar;
