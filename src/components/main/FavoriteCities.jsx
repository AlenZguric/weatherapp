import React, { useState, useEffect } from "react";
import { fetchWeatherDataForCity } from "../../utils/fetchWeatherDataForCity ";
import { RiDeleteBin6Line } from 'react-icons/ri';



const FavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const fetchFavoriteCitiesWeatherData = async () => {
      const weatherDataPromises = favorites.map(async (cityName) => {
        const weatherData = await fetchWeatherDataForCity(cityName);
        return weatherData;
      });  

      const favoriteCitiesWeatherData = await Promise.all(weatherDataPromises);
      setFavoriteCities(favoriteCitiesWeatherData);
    };

    fetchFavoriteCitiesWeatherData();

  }, []);

  const removeFromFavorites = (cityName) => {
    const updatedFavorites = favoriteCities.filter(city => city.name !== cityName);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites.map(city => city.name)));
  };


  return (
    <div>
      <h2>Favorite Cities</h2>
      <ul>
        {favoriteCities.map((cityWeather, index) => (
          <li key={index}>
            {cityWeather ? (
              <div>
                <h3>{cityWeather.name}</h3>
                <p>Temperature: {cityWeather.main.temp.toFixed(1)} °C</p>
                <p>feels like: {cityWeather.main.feels_like.toFixed(1)} °C</p>
                <RiDeleteBin6Line onClick={() => removeFromFavorites(cityWeather.name)} />

              </div>
            ) : (
              <p>Failed to fetch weather data for this city.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
