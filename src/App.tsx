import React, { useState } from 'react';
import { fetchWeather } from './services/fetchWeather';
import './App.css';

function App() {
  const [query, setQuery] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | undefined>();

  const cityWeather = async (e: any) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  }

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Type any city name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={cityWeather}
      />
      {weather?.temp && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.city}</span>
            <sup>{weather.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.iconName}@2x.png`} alt={weather.discription} />
            <p>{weather.discription}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
