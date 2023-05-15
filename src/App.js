import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError("Could not fetch weather data");
      setWeather(null);
    }
  };

  return (
    <>
      <header>
        <h1>Weather App</h1>
      </header>
      <nav>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city">Enter city:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>
      </nav>
      <main>
        {error && <p>{error}</p>}
        {weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <ul>
              <li>Temperature: {weather.main.temp}°C</li>
              <li>Pressure: {weather.main.pressure} hPa</li>
              <li>Humidity: {weather.main.humidity}%</li>
              <li>Wind speed: {weather.wind.speed} m/s</li>
              <li>Wind direction: {weather.wind.deg}°</li>
            </ul>
          </div>
        )}
      </main>
    </>
  );
}

export default Weather;
