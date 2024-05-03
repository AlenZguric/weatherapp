import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWeatherDataForCity } from "../../utils/fetchWeatherDataForCity ";
import { getWindDirection } from "../../utils/getWindDirection";
import FiveDayForecast from "../../components/main/FiveDayForecast";
import moment from "moment";

import "../../assets/styles/components/main/CityDetail.css";

const CityDetails = () => {
  const [cityWeather, setCityWeather] = useState(null);
  const { cityName } = useParams();
  const currentTime = moment().format("LTS");

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
          timestamp: moment().format("DD.MM.YYYY"),
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
    <div className="city-details-component">
      <div className="location-page-title">
        <h1>
          <strong>Current Weather Details</strong>
        </h1>
        <h2>
          <span>
            In{" "}
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                cityWeather.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Wikipedia"
            >
              {cityWeather.name}
            </a>{" "}
          </span>
        </h2>
      </div>
      <div className="current-weather-box-main">
        <div className="current-weather-box">
          <div className="current-weather-box-group">
            <div className="current-weather-box-row">
              <div className="current-weather-box-item">
                <p>
                  Feels Like:{" "}
                  <strong>
                    {" "}
                    {cityWeather.main &&
                      cityWeather.main.feels_like.toFixed(1)}{" "}
                    °C
                  </strong>
                </p>
                <p>
                  at <strong>{currentTime}</strong>{" "}
                </p>
              </div>
              <div className="current-weather-box-item">
                {" "}
                <p>
                  Wind:{" "}
                  <strong>
                    {cityWeather.wind && cityWeather.wind.speed.toFixed(1)} m/s
                  </strong>
                </p>
                <p>
                  Wind direction:{" "}
                  <strong>{getWindDirection(cityWeather.wind.deg)}</strong>
                </p>
              </div>
            </div>
            <div className="current-weather-box-row">
              <div className="current-weather-box-item">
                <p>
                  Precipitation:{" "}
                  <strong>
                    {cityWeather.weather && cityWeather.weather[0].description}
                  </strong>
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${
                    cityWeather.weather && cityWeather.weather[0].icon
                  }.png`}
                  alt="Weather Icon"
                />
              </div>
              <div className="current-weather-box-item">
                <p>
                  Humidity: <strong>{cityWeather.main.humidity} %</strong>
                </p>
                <p>
                  Pressure: <strong>{cityWeather.main.pressure} hPa </strong>
                </p>
              </div>
            </div>
            <div className="current-weather-box-row">
              <div className="current-weather-box-item">
                {" "}
                <p>
                  Visibility: <strong>{cityWeather.visibility} m</strong>
                </p>
              </div>
            </div>
            <div className="current-weather-box-row">
              <div className="sunset-data-box">
                <div className="sunset-data">
                  <div className="sunset-row">
                    <div className="sunset-icon-text" title="sunrise time">
                      <svg className="sunset-icon" name="sunset-sun">
                        <title>Sun Rise</title>
                        <path
                          d="M12.003 16.125v-2.21m-5.602 2.129l1.69 1.441m9.237-1.489l-1.4 1.63"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4.05 20.938h2.48m11.27 0h2.481"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12 9.938V4.426M8.563 6.5L12 3.062M15.438 6.5L12 3.062"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <path d="M12.02 21.605h3.059c.421 0 .543-.229.543-.455 0-1.735-1.613-3.142-3.602-3.142-1.99 0-3.603 1.407-3.603 3.142 0 .266.1.455.529.455h3.074z"></path>
                      </svg>
                      <div className="sunset-text" title="sunrise time">
                        {" "}
                        <p>
                          Sunrise at{" "}
                          {new Date(
                            cityWeather.sys.sunrise * 1000
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="sunset-icon-text" title="sunset time">
                      <svg className="sunset-icon" name="sunset-sun">
                        <title>Sunset</title>
                        <path
                          d="M12.003 15.781v-2.21M6.401 15.7l1.69 1.442m9.237-1.49l-1.4 1.63"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4.05 20.594h2.48m11.27 0h2.481"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12 3.063v5.51M8.563 6.5L12 9.938M15.438 6.5L12 9.938"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <path d="M12.02 21.261h3.059c.421 0 .543-.229.543-.455 0-1.735-1.613-3.142-3.602-3.142-1.99 0-3.603 1.407-3.603 3.142 0 .266.1.455.529.455h3.074z"></path>
                      </svg>
                      <div className="sunset-text" title="sunrise time">
                        {" "}
                        <p>
                          Sunset at{" "}
                          {new Date(
                            cityWeather.sys.sunset * 1000
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="info">
                  <span>*</span>The sunrise and sunset times are displayed
                  according to your time zone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="five-days-component">
        <FiveDayForecast />
      </div>
    </div>
  );
};

export default CityDetails;
