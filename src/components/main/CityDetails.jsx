import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWeatherDataForCity } from "../../utils/fetchWeatherDataForCity ";
import { getWindDirection } from "../../utils/getWindDirection";
import FiveDayForecast from "../../components/main/FiveDayForecast";
import moment from "moment";

const CityDetails = () => {
  const [cityWeather, setCityWeather] = useState(null);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherDataForCity(cityName);
        setCityWeather(weatherData);

        const storedCities =
          JSON.parse(localStorage.getItem("selectedCities")) || [];

          const cityExists = storedCities.some(city => city.name === cityName);
          if (!cityExists) {
            const newCity = {
              name: cityName,
              timestamp: moment().format(' DD.MM.YYYY'),
            };
        const updatedCities = [...storedCities, newCity];
        localStorage.setItem("selectedCities", JSON.stringify(updatedCities));}
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  if (!cityWeather) {
    return (
      <div className="error-msg">
        Name of the city not found! Please check your input and try again!!!
      </div>
    );
  }

  // Prikaz detaljnih informacija o vremenu za odabrani grad
  return (
    <div className="city-details">
      <h2> Weather Details</h2>
      <h3>{cityWeather.name}</h3>
      <p>
        Feels Like: {cityWeather.main && cityWeather.main.feels_like.toFixed(1)}{" "}
        °C
      </p>
      <p>
        Temperature: {cityWeather.main && cityWeather.main.temp.toFixed(1)} °C
      </p>
      <p>
        Min. Temp: {cityWeather.main && cityWeather.main.temp_min.toFixed(1)} °C
      </p>
      <p>
        Max. Temp: {cityWeather.main && cityWeather.main.temp_max.toFixed(1)} °C
      </p>
      <p>Wind: {cityWeather.wind && cityWeather.wind.speed.toFixed(1)} m/s</p>
      {cityWeather.wind && (
        <p>Wind direction: {getWindDirection(cityWeather.wind.deg)}</p>
      )}

      <p>Precipitation: {cityWeather.weather && cityWeather.weather[0].main}</p>
      <img
        src={`http://openweathermap.org/img/wn/${
          cityWeather.weather && cityWeather.weather[0].icon
        }.png`}
        alt="Weather Icon"
      />
      <div className="five-days">
        <FiveDayForecast />
      </div>
    </div>
  );
};

export default CityDetails;
