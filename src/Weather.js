import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = 'a457c6861e66605682b30bc5b79b865c';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        setWeather(response.data);
      } catch (error) {
        setWeather(null);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) {
    return <p>Invalid city input!</p>;
  }

  const { main, weather: weatherDetails, wind, clouds, sys, visibility, coord } = weather;


  return (
    <div className="result">
      <div className="updateTime">
        <p>Last updated {new Date(weather.dt * 1000).toLocaleString()}</p>
      </div>
      <div className="weather-container">
        <h1>{city}</h1>
        <h2>{weather.main.temp}°C</h2>
        <p>Feels Like: {weather.main.feels_like}°C</p>
        <p>Min Temperature: {weather.main.temp_min}°C</p>
        <p>Max Temperature: {weather.main.temp_max}°C</p>
        <p>Condition: {weather.weather[0].main}</p>
        <p>Description: {weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Pressure: {weather.main.pressure} hPa</p>
        <p>Visibility: {weather.visibility / 1000} km</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Wind Direction: {weather.wind.deg}°</p>
        <p>Cloudiness: {weather.clouds.all}%</p>
        <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>Coordinates: {weather.coord.lat}, {weather.coord.lon}</p>
      </div>
    </div>
  );
};

export default Weather;
