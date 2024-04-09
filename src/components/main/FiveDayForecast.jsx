import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import  {fetchWeatherDataForFiveDays}  from "../../utils/fetchWeatherDataForFiveDays";

const FiveDayForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherDataForFiveDays(cityName);
        setForecastData(weatherData);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };
  
    fetchData();
  }, [cityName]);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Prikaži vremensku prognozu za sljedećih pet dana
  return (
    <div className='five-day-forecast'>
      <h2>Five Day Forecast</h2>
      {forecastData.list.map((forecast, index) => (
        <div key={index} className='forecast-item'>
          <p>Date and Time: {forecast.dt_txt}</p>
          <p>Temperature: {forecast.main.temp.toFixed(1)} °C</p>
          <p>Min. Temp: {forecast.main.temp_min.toFixed(1)} °C</p>
          <p>Max. Temp: {forecast.main.temp_max.toFixed(1)} °C</p>
          <p>Wind: {forecast.wind.speed.toFixed(1)} m/s</p>
          <p>Precipitation: {forecast.weather[0].main}</p>
          <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt='Weather Icon' />
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
