import React, { useState } from "react";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!search.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather");
      }

      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div
        className="card shadow-lg p-4"
        style={{ width: "24rem", borderRadius: "1rem" }}
      >
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Weather App</h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name..."
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={fetchWeather}>
              Search
            </button>
          </div>

          {loading && <p className="text-info mt-3">Loading...</p>}

          {error && <p className="text-danger mt-3">{error}</p>}

          {weather && weather.main && (
            <div className="mt-4">
              <h3>
                {weather.name}, {weather.sys.country}
              </h3>
              <p className="text-muted">{weather.weather[0].description}</p>
              <p className="fs-2 fw-bold">{weather.main.temp}°C</p>
              <p>Feels like: {weather.main.feels_like}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind speed: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
