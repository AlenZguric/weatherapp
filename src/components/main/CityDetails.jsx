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
      const existingCityIndex = storedCities.findIndex(
        (cityObj) => cityObj.name === cityName
      );
      const newCity = {
        name: cityName,
        timestamp: moment().format('DD.MM.YYYY'),
      };

      if (existingCityIndex !== -1) {
        storedCities[existingCityIndex].timestamp = newCity.timestamp;
      } else {
        storedCities.push(newCity);
      }

      localStorage.setItem("selectedCities", JSON.stringify(storedCities));

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

  return (
    <div className="city-details">
      <h2> Weather Details</h2>
      <h3>{cityWeather.name} Now</h3>
      <p>
        Feels Like: {cityWeather.main && cityWeather.main.feels_like.toFixed(1)}{" "}
        °C
      </p>
      <p>
        Temperature: {cityWeather.main && cityWeather.main.temp.toFixed(1)} °C
      </p>
     
      <p>Wind: {cityWeather.wind && cityWeather.wind.speed.toFixed(1)} m/s</p>
      <p>Wind direction: {getWindDirection(cityWeather.wind.deg)}
      </p>

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
