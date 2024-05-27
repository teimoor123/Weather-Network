import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Weather from './Weather';

function App() {
  const [city, setCity] = useState('Toronto');
  const [newCity, setNewCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(newCity);
  };

  return (
    <div className="App">
      <div className="sitename-container">
        <div className="left-sitename-container">
        <img src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" className="logo" alt="Logo" />
        <h1 className="sitename">My Weather Network</h1>
        </div>
        <div className="right-sitename-container">
        <form className="weather-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="weather-input"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="weather-button" type="submit">Get Weather</button>
        </form>
        </div>
      </div>
      <header className="App-header">
        <Weather city={city} />
      </header>
    </div>
  );
}

export default App;

