import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  async function getWeather() {
    if (city.trim() === "") {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.cod !== 200) {
      setError(data.message);
      setWeather(null);
      return;
    }

    setWeather(data);
    setError("");
  }

  return (
    <div className="app">
      <div className="weather-card">
        <h1>Weather App 🌤</h1>

        <p>Search weather by city</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />

          <button onClick={getWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && weather.main && weather.weather && (
          <div className="weather-result">
            <h2>{weather.name}</h2>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
