import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function capitalize(str) {
  return str.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = 'a457c6861e66605682b30bc5b79b865c';
  const weatherIcons = {
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/3104/3104612.png",
    Drizzle: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png",
    Rain: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png",
    Snow: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Weather-snow.svg/1024px-Weather-snow.svg.png",
    Mist: "https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-daytime-foggy-weather-clouds-illustration-png-image_5246770.png",
    Smoke: "https://cdn4.iconfinder.com/data/icons/weather-708/64/45_fog_cloud_weather_smoke_smog_transparent_wintry-512.png",
    Haze: "https://cdn-icons-png.flaticon.com/512/1779/1779807.png",
    Dust: "https://icons.veryicon.com/png/o/weather/weather-7/dust-1.png",
    Fog: "https://cdn4.iconfinder.com/data/icons/weather-708/64/45_fog_cloud_weather_smoke_smog_transparent_wintry-512.png",
    Sand: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-19-512.png",
    Ash: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-19-512.png",
    Squall: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-19-512.png",
    Tornado: "https://cdn-icons-png.flaticon.com/512/6566/6566398.png",
    Clear: "https://seeklogo.com/images/S/sunny-weather-symbol-logo-4E2A5E54AA-seeklogo.com.png",
    Clouds: "https://cdn.iconscout.com/icon/free/png-256/free-cloudy-weather-11-1147979.png",
  };

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

  const { main, weather: weatherDetails, wind, clouds, sys, visibility, coord, timezone } = weather;

  const localTime = (time) => {
    const date = new Date((time + timezone) * 1000);
    const offset = date.getTimezoneOffset() * 60;
    return new Date((time + timezone + offset) * 1000).toLocaleTimeString();
  }

  const weatherCondition = weather.weather[0].main;
  let weatherIconUrl = weatherIcons[weatherCondition];
  const isNight = localTime >= sys.sunset || localTime < sys.sunrise;
  const rainConditions = ['Rain', 'Drizzle', 'Thunderstorm', 'Mist'];
  const isWetCondition = rainConditions.includes(weatherCondition);

  if (isNight) {
    if (isWetCondition) {
      weatherIconUrl = "https://icons.veryicon.com/png/o/weather/weather-icon-7/rain-at-night-1.png"
    }
    else {
      weatherIconUrl = "https://cdn-icons-png.flaticon.com/512/6805/6805164.png"
    }
  }

  const cityDisplay = capitalize(city);

  return (
    <div className="result">
      <div className="updateTime">
        <p>Last updated {new Date(weather.dt * 1000).toLocaleString()}</p>
      </div>
      <div className="weather-container">
        <div className="weather-main">
          <div className="weather-header">
            <div className="weather-city">{cityDisplay}</div>
            <br></br>
            <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
          </div>
          <img src={weatherIconUrl} alt={weatherCondition} height="200px" />
        </div>
        <p>Feels Like: {weather.main.feels_like}°C</p>
        <hr className="transparent-hr" />
        <p>Min Temperature: {weather.main.temp_min}°C</p>
        <hr className="transparent-hr" />
        <p>Max Temperature: {weather.main.temp_max}°C</p>
        <hr className="transparent-hr" />
        <p>Condition: {weather.weather[0].main}</p>
        <hr className="transparent-hr" />
        <p>Description: {weather.weather[0].description}</p>
        <hr className="transparent-hr" />
        <p>Humidity: {weather.main.humidity}%</p>
        <hr className="transparent-hr" />
        <p>Pressure: {weather.main.pressure} hPa</p>
        <hr className="transparent-hr" />
        <p>Visibility: {weather.visibility / 1000} km</p>
        <hr className="transparent-hr" />
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <hr className="transparent-hr" />
        <p>Wind Direction: {weather.wind.deg}°</p>
        <hr className="transparent-hr" />
        <p>Cloudiness: {weather.clouds.all}%</p>
        <hr className="transparent-hr" />
        <div className="weather-sun">
          <p>Sunrise: {localTime(weather.sys.sunrise)}</p>
          <p>Sunset: {localTime(weather.sys.sunset)}</p>
        </div>
        <hr className="transparent-hr" />
        <p>Coordinates: {weather.coord.lat}, {weather.coord.lon}</p>
      </div>
    </div>
  );
};

export default Weather;
