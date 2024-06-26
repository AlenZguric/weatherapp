const cityWeatherData = (city, response) => ({
    name: city.name,
    feelsLike: response.data.main.feels_like.toFixed(1),
    temp: response.data.main.temp.toFixed(1),
    wind: response.data.wind.speed,
    precipitation: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
    minTemp: response.data.main.temp_min.toFixed(1),
    maxTemp: response.data.main.temp_max.toFixed(1),
    windDirection: response.data.wind.deg,
    sunrise: response.data.sys.sunrise,
    sunset: response.data.sys.sunset,
    visibility: response.data.visibility,
  });
  
  export default cityWeatherData;
  