import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const SearchedCityStorage = () => {
  const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];

  const handleDeleteCity = (index) => {
    const updatedCities = [...storedCities];
    updatedCities.splice(index, 1);
    localStorage.setItem("selectedCities", JSON.stringify(updatedCities));
    window.location.reload(); // Ponovno učitavanje stranice kako bi se ažurirao prikaz
  };

  return (
    <div className="searched-city-storage">
      {storedCities.length === 0 ? (
        <div className="error-msg">No recently searched cities found.</div>
      ) : (
        <>
         
          <ul>
            {storedCities.map((city, index) => (
              <li key={index}>
                <div className="searched-city-storage-box">
                  <div className="city">
                    <Link to={`/citys/${city.name}`}>
                      <p>{city.name}</p>
                    </Link>
                  </div>
                  <div className="time">
                    <p>Searched at:</p>
                    <span>{city.timestamp}</span>
                  </div>
                  <div className="delete-btn">
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
