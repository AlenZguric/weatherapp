import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_Key } from "../../Api/ApiKey";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const CityListWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToFavorites = (cityName) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(cityName)) {
      favorites.push(cityName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  useEffect(() => {
    const cities = [
      { name: "London", lat: 51.51, lon: -0.13 },
      { name: "New York", lat: 40.71, lon: -74.01 },
      { name: "Tokyo", lat: 35.68, lon: 139.76 },
      { name: "Paris", lat: 48.85, lon: 2.35 },
      { name: "Moscow", lat: 55.75, lon: 37.62 },
      { name: "Beijing", lat: 39.9, lon: 116.41 },
      { name: "Berlin", lat: 52.52, lon: 13.4 },
      { name: "Sydney", lat: -33.87, lon: 151.21 },
      { name: "Dubai", lat: 25.27, lon: 55.3 },
      { name: "Los Angeles", lat: 34.05, lon: -118.24 },
      { name: "São Paulo", lat: -23.55, lon: -46.64 },
      { name: "Zagreb", lat: 45.81, lon: 15.98 },
    ];

    const fetchData = async () => {
      try {
        const data = await Promise.all(
          cities.map(async (city) => {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_Key}&units=metric`
            );
            const cityWeatherData = {
              name: city.name,
              feelsLike: response.data.main.feels_like.toFixed(1),
              temp: response.data.main.temp.toFixed(1),
              wind: response.data.wind.speed,
              precipitation: response.data.weather[0].main,
              icon: response.data.weather[0].icon,
              minTemp: response.data.main.temp_min.toFixed(1),
              maxTemp: response.data.main.temp_max.toFixed(1),
            };

            //console.log(response);
            return cityWeatherData;
          })
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setIsLoading(false)
    fetchData();
  }, []);
  return (
    <div className="city-list-weather">
      <h1>Weather Forecast</h1>
      {isLoading ? <Oval/> :  <div className="weather-cards">
        {weatherData.map((cityWeather, index) => (
          <div className="weather-card" key={index}>
            <Link to={`/citys/${cityWeather.name}`}>
              <h2>{cityWeather.name}</h2>
            </Link>

            <p>Feels Like: {cityWeather.feelsLike} °C</p>
            <p>Temperature: {cityWeather.temp} °C</p>
            <p>Min. Temp: {cityWeather.minTemp} °C</p>
            <p>Max. Temp: {cityWeather.maxTemp} °C</p>

            <p>Wind: {cityWeather.wind} m/s</p>
            <p>Precipitation: {cityWeather.precipitation}</p>
            <img
              src={`http://openweathermap.org/img/wn/${cityWeather.icon}.png`}
              alt="Weather Icon"
            />
            <button onClick={() => addToFavorites(cityWeather.name)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>}
     
    </div>
  );
};

export default CityListWeather;
