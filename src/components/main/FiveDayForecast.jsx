import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchWeatherDataForFiveDays } from "../../utils/fetchWeatherDataForFiveDays";
import formatDateTime from "../../utils/formatDateTime";

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

  // Grupirajte podatke po danima
  const groupedData = forecastData.list.reduce((acc, forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast);
    return acc;
  }, {});

  // Izdvojite podatke za danas i sutra
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className='five-day-forecast'>
      <h2>Five Day Forecast</h2>
      {Object.entries(groupedData).map(([date, forecasts]) => (
        <div key={date}>
          <h3>{date === today ? 'Today' : date === tomorrow ? 'Tomorrow' : date}</h3>
          {forecasts.map((forecast, index) => (
            <div key={index} className='forecast-item'>
              <p>Time: {formatDateTime(forecast.dt_txt)}</p>
              <p>Temperature: {forecast.main.temp.toFixed(1)} °C</p>
              <p>Pressure: {forecast.main.pressure}  hPa</p>
              <div className="wind">
                <p>Wind: {forecast.wind.speed.toFixed(1)} m/s</p>
                <p>Wind direction {forecast.wind.deg}</p>
              </div>
              <p>Precipitation: {forecast.weather[0].main}</p>
              <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt='Weather Icon' />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
