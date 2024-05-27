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

  return (
    <div className="weather-container">
      <h2>Weather in {city}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].main}</p>
    </div>
  );
};

export default Weather;
