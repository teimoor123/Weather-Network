import logo from './logo.svg';
import './App.css';
import React from 'react';
import Weather from './Weather';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather />
      </header>
    </div>
  );
}

export default App;