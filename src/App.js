import logo from './logo.svg';
import './App.css';
import React from 'react';
import Weather from './Weather';


function App() {
  return (
    <div className="App">
      <div className="sitename">
        <img src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" width="50" height="50"></img>
        <h1>My Weather Network</h1>
      </div>
      <header className="App-header">
        <Weather/>
      </header>
    </div>
  );
}

export default App;
