import React from "react";
import CityListWeather from "../components/main/CityListWeather";
import Greeting from "../components/header/Greeting";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="title">
        <Greeting/>
      </div>
      <div className="city-weather">     
        <CityListWeather />
      </div>
    </div>
  );
};

export default HomePage;
