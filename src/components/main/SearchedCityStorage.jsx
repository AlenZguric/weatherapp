import React from 'react';

const SearchedCityStorage = () => {
  const storedCities = JSON.parse(localStorage.getItem('selectedCities')) || [];

  return (
    <div>
      {storedCities.length === 0 ? (
        <div className='error-msg'>No recently searched cities found.</div>
      ) : (
        <>
          <h2>Recently Searched Cities</h2>
          <ul>
            {storedCities.map((city, index) => (
              <li key={index}>
                <div className="city">
                <p>{city.name} </p>
                </div>
                <div className="time">
                  <p>Searched at:</p>
                  <span>{city.timestamp}</span>
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
