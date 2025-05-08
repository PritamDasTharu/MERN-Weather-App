import React, { useState } from "react";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "69be21edafec5567f6463c77fad7c711";
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === "404") {
        setWeather(null);
        setError("City not found");
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An error occurred. Please try again.");
      setWeather(null);
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchWeather}>
              Search
            </button>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}

          {weather && weather.main && (
            <div className="mt-4">
              <h3 className="mt-3">
                {weather.name}, {weather.sys.country}
              </h3>
              <p className="text-muted">{weather.weather[0].description}</p>
              <p className="fs-2 fw-bold">{weather.main.temp}°C</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
