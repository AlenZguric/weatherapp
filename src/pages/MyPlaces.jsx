import React, { useState } from 'react';
import CityDetails from '../components/main/CityDetails';

const MyPlaces = () => {
  const [selectedCity, setSelectedCity] = useState(null);

 
  return (
    <div className="myplacesPage">
      <div className="city-details">
        <CityDetails cityName={selectedCity} />
      </div>
    </div>
  );
};

export default MyPlaces;
