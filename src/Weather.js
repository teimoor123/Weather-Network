import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure CSS file is imported

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const apiKey = 'a457c6861e66605682b30bc5b79b865c'  ; 
  const [city, setCity] = useState('Toronto');
  const [newCity, setnewCity] = useState('');
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
  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(newCity);
  };

  if (!weather) 
    return (
        <div className="weather-container">
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={newCity}
            onChange={(e) => setnewCity(e.target.value)}
            placeholder="Enter city name"
            />
            <button className="weather-button" type="submit">Get Weather</button>
        </form>
        <p>Invalid city input!</p>
        
        </div>
    );

  else
    return (
        <div className="weather-container">
        <form className="weather-form" onSubmit={handleSubmit}>
            <input
            type="text"
            className="weather-input"
            value={newCity}
            onChange={(e) => setnewCity(e.target.value)}
            placeholder="Enter city name"
            />
            <button className="weather-button" type="submit">Get Weather</button>
        </form>
        
        <h2 className="weather-h2" >Weather in {city}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].main}</p>
        
        </div>
    );

};

export default Weather;

