import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { API_Key } from "../../Api/ApiKey";
import cityWeatherData from "../../utils/cityWeatherData";
import { getWindDirection } from "../../utils/getWindDirection";
import cityImages from "../../utils/cityImages";

const CityListWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const cities = [
      { name: "London", lat: 51.51, lon: -0.13 },
      { name: "New_York", lat: 40.71, lon: -74.01 },
      { name: "Tokyo", lat: 35.68, lon: 139.76 },
      { name: "Paris", lat: 48.85, lon: 2.35 },
      { name: "Moscow", lat: 55.75, lon: 37.62 },
      { name: "Beijing", lat: 39.9, lon: 116.41 },
      { name: "Berlin", lat: 52.52, lon: 13.4 },
      { name: "Sydney", lat: -33.87, lon: 151.21 },
      { name: "Dubai", lat: 25.27, lon: 55.3 },
      { name: "Los_Angeles", lat: 34.05, lon: -118.24 },
      { name: "São_Paulo", lat: -23.55, lon: -46.64 },
      { name: "Zagreb", lat: 45.81, lon: 15.98 },
      { name: "Toronto", lat: 43.65, lon: -79.38 },
      { name: "Mexico_City", lat: 19.43, lon: -99.13 },
      { name: "Istanbul", lat: 41.01, lon: 28.97 },
      { name: "Mumbai", lat: 19.07, lon: 72.87 },
      { name: "Shanghai", lat: 31.23, lon: 121.47 },
      { name: "Cairo", lat: 30.04, lon: 31.24 },
      { name: "Bangkok", lat: 13.75, lon: 100.51 },
      { name: "Seoul", lat: 37.57, lon: 126.98 },
      { name: "Osaka", lat: 34.69, lon: 135.5 },
      { name: "Lagos", lat: 6.52, lon: 3.38 },
      { name: "Jakarta", lat: -6.21, lon: 106.85 },
      { name: "Lima", lat: -12.05, lon: -77.04 },
      { name: "Bangalore", lat: 12.97, lon: 77.59 },
      { name: "Kolkata", lat: 22.57, lon: 88.36 },
      { name: "Manila", lat: 14.6, lon: 120.98 },
      { name: "Rio_de_Janeiro", lat: -22.91, lon: -43.18 },
      { name: "Karachi", lat: 24.86, lon: 67.01 },
    ];

    const fetchData = async () => {
      try {
        const data = await Promise.all(
          cities.map(async (city) => {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_Key}&units=metric`
            );
            // console.log(response)

            const cityWeatherDataObject = cityWeatherData(city, response);
            return cityWeatherDataObject;
          })
        );
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = (cityName) => {
    const updatedFavorites = favorites.includes(cityName)
      ? favorites.filter((fav) => fav !== cityName)
      : [...favorites, cityName];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="city-list-weather">
      <h1>Weather Forecast</h1>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {isLoading ? (
        <Oval />
      ) : (
        <div className="weather-cards">
          {weatherData.map((cityWeather, index) => (
            <div className="weather-card" key={index}>
              <div className="image-of-city">
                <div className="image">
                  {cityImages[cityWeather.name] && (
                    <img
                      src={cityImages[cityWeather.name]}
                      alt={cityWeather.name}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="wikipedia">
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                      cityWeather.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn about...
                  </a>
                </div>
              </div>
              <Link to={`/citys/${cityWeather.name}`}>
                <h2>{cityWeather.name}</h2>
              </Link>

              <p>Feels Like: {cityWeather.feelsLike} °C</p>
              <p>Temperature: {cityWeather.temp} °C</p>
              <p>Min. Temp: {cityWeather.minTemp} °C</p>
              <p>Max. Temp: {cityWeather.maxTemp} °C</p>
              <p>Wind: {cityWeather.wind} m/s</p>
              <p>
                Wind direction: {getWindDirection(cityWeather.windDirection)}
              </p>
              <p>Precipitation: {cityWeather.precipitation}</p>

              <img
                src={`http://openweathermap.org/img/wn/${cityWeather.icon}.png`}
                alt="Weather Icon"
              />
              <FontAwesomeIcon
                icon={faStar}
                color={
                  favorites.includes(cityWeather.name) ? "yellow" : "black"
                }
                onClick={() => toggleFavorite(cityWeather.name)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityListWeather;
