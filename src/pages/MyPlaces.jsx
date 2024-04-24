import React from 'react';
import SearchedCityStorage from '../components/main/SearchedCityStorage';

import "../assets/styles/pages/MyPlacesPage.css";

const MyPlaces = () => {



  return (
    <div className="my-places-page">
      <div className="main-title">
        <h2>Recently Searched Cities</h2>
      </div>
        <SearchedCityStorage  />

     
    </div>
  );
};

export default MyPlaces;
