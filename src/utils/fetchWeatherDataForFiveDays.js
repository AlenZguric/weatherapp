import axios from 'axios';
import { API_Key } from "../Api/ApiKey";

export const fetchWeatherDataForFiveDays = async (cityName) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_Key}&units=metric`);
    console.log('Weather data for', cityName, ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
