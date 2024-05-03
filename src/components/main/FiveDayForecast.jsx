import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWeatherDataForFiveDays } from "../../utils/fetchWeatherDataForFiveDays";
import formatDateTime from "../../utils/formatDateTime";
import { getWindDirection } from "../../utils/getWindDirection";
import "../../assets/styles/components/main/FiveDayForecast.css";

const FiveDayForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null); // Dodajte stanje za prošireni dan
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherDataForFiveDays(cityName);
        setForecastData(weatherData);
        setExpandedDay(null); // Postavite prošireni dan na null kada se podaci preuzmu
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Grupirajte podatke po danima
  const groupedData = forecastData.list.reduce((acc, forecast) => {
    const date = forecast.dt_txt.split(" ")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast);
    return acc;
  }, {});

  // Funkcija za promenu proširenog dana
  const toggleExpandedDay = (date) => {
    if (expandedDay === date) {
      setExpandedDay(null); // Sakrij ako je već proširen
    } else {
      setExpandedDay(date); // Inače proširi
    }
  };

  return (
    <div className="five-day-forecast">
      <div className="title">
        <h2>Five Day Forecast</h2>
      </div>
      <div className="five-days-forecast-box">
        {Object.entries(groupedData).map(([date, forecasts]) => (
          <div className="single-day" key={date}>
            <div
              className="single-day-title"
              onClick={() => toggleExpandedDay(date)} // Dodajte event handler za klik
            >
              <h3>
                {date === new Date().toISOString().split("T")[0]
                  ? "Today"
                  : date ===
                    new Date(
                      new Date().getTime() + 24 * 60 * 60 * 1000
                    ).toISOString()
                      .split("T")[0]
                  ? "Tomorrow"
                  : date}
              </h3>
              <svg className="arrow-down">
                <title>Arrow Down</title>
                <path d="M12 16.086l7.293-7.293a1 1 0 1 1 1.414 1.414l-8 8a1 1 0 0 1-1.414 0l-8-8a1 1 0 1 1 1.414-1.414L12 16.086z"></path>
              </svg>
            </div>
            {(expandedDay === date || !expandedDay) && ( // Prikaži ako je dan proširen ili ako nijedan dan nije proširen
              <>
                <div className="single-day-description">
                  <span>Time</span>
                  <span>Temp.</span>
                  <span>Pressure</span>
                  <span>Wind m/s, dir.</span>
                  <span>Precip.</span>
                  <span></span>
                </div>
                <hr />

                {forecasts.map((forecast, index) => (
                  <div key={index} className="single-day-data">
                    <span>{formatDateTime(forecast.dt_txt)}</span>
                    <span>{forecast.main.temp.toFixed(1)} °C</span>
                    <span>{forecast.main.pressure} hPa</span>

                    <span>
                      {forecast.wind.speed.toFixed(1)} ,{" "}
                      {getWindDirection(forecast.wind.deg)}{" "}
                    </span>

                    <span>{forecast.weather[0].main}</span>
                    <span>
                      <img
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt="Weather Icon"
                      />
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
