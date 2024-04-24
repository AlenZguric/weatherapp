import React, {useState} from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import "../../assets/styles/components/main/SearchedCityStorage.css";

const SearchedCityStorage = () => {
  const [storedCities, setStoredCities] = useState(JSON.parse(localStorage.getItem("selectedCities")) || []);
  
  const handleDeleteCity = (index) => {
    const updatedCities = [...storedCities];
    updatedCities.splice(index, 1);
    localStorage.setItem("selectedCities", JSON.stringify(updatedCities));
    setStoredCities(updatedCities);
    };

  const handleSortAsc = () => {
    const sortedCities = [...storedCities].sort((a, b) => a.name.localeCompare(b.name));
    setStoredCities(sortedCities);
  };

  const handleSortDesc = () => {
    const sortedCities = [...storedCities].sort((a, b) => b.name.localeCompare(a.name));
    setStoredCities(sortedCities);
  };

  return (
    <div className="searched-city-storage">
      {storedCities.length === 0 ? (
        <div className="error-msg">
          <p>No recently searched cities found.</p>
          <p>To go up and enter the city name in the search bar</p>
        </div>
      ) : (
        <>
        <div className="sort-btns">
            <button onClick={handleSortAsc} title="Sort A-Z"><RiArrowUpSLine /></button>
            <button onClick={handleSortDesc} title="Sort Z-A"><RiArrowDownSLine /></button>
          </div>
          <ul>
            {storedCities.map((city, index) => (
              <li key={index}>
                <div className="searched-city-storage-box">
                  <div className="city" title="Show weather data">
                    <Link to={`/citys/${city.name}`}>
                      <p>{city.name}</p>
                    </Link>
                  </div>
                  <div className="time">
                    <p>Last searched at:</p>
                    <span>{city.timestamp}</span>
                  </div>
                  <div className="delete-btn" title="delete  city from list">
                    <button onClick={() => handleDeleteCity(index)}>
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchedCityStorage;
