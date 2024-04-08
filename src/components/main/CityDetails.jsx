import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchWeatherDataForCity } from "../../utils/fetchWeatherDataForCity ";

const CityDetails = () => {
  const [cityWeather, setCityWeather] = useState(null);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherDataForCity(cityName);
        setCityWeather(weatherData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cityName]);

  if (!cityWeather) {
    return <div>Loading...</div>;
  }

  // Prikaz detaljnih informacija o vremenu za odabrani grad
  return (
    <div className='city-details'>
      <h2> Weather Details</h2>
      <h3>{cityWeather.name}</h3>
      <p>Feels Like: {cityWeather.main && cityWeather.main.feels_like.toFixed(1)} °C</p>
      <p>Temperature: {cityWeather.main && cityWeather.main.temp} °C</p>
      <p>Min. Temp: {cityWeather.main && cityWeather.main.temp_min} °C</p>
      <p>Max. Temp: {cityWeather.main && cityWeather.main.temp_max} °C</p>
      <p>Wind: {cityWeather.wind && cityWeather.wind.speed} m/s</p>
      <p>Precipitation: {cityWeather.weather && cityWeather.weather[0].main}</p>
      <img src={`http://openweathermap.org/img/wn/${cityWeather.weather && cityWeather.weather[0].icon}.png`} alt='Weather Icon' />
    </div>
  );
};

export default CityDetails;
