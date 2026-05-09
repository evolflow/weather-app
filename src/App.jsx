import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getWeather() {
    if (city.trim() === "") {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
      setError("");
    } catch (error) {
      setError("Something went wrong");
      setWeather(null);
    }

    setLoading(false);
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

        {loading && <p className="loading">Loading...</p>}

        {weather &&
          weather.main &&
          weather.weather &&
          weather.wind &&
          weather.sys && (
            <div className="weather-result">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>

              <h1>
                {weather.weather[0].main === "Clear" && "☀️"}
                {weather.weather[0].main === "Clouds" && "☁️"}
                {weather.weather[0].main === "Rain" && "🌧"}
                {weather.weather[0].main === "Snow" && "❄️"}
              </h1>

              <p>{Math.round(weather.main.temp)}°C</p>

              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>

              <p>{weather.weather[0].description}</p>

              <div className="details">
                <div className="detail-box">
                  <span>💧</span>
                  <p>Humidity</p>
                  <strong>{weather.main.humidity}%</strong>
                </div>

                <div className="detail-box">
                  <span>🌬</span>
                  <p>Wind</p>
                  <strong>{weather.wind.speed} m/s</strong>
                </div>

                <div className="detail-box">
                  <span>🌡</span>
                  <p>Feels like</p>
                  <strong>{Math.round(weather.main.feels_like)}°C</strong>
                </div>
              </div>

              <div className="sun-times">
                <div className="sun-box">
                  <p>🌅 Sunrise</p>

                  <strong>
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </strong>
                </div>

                <div className="sun-box">
                  <p>🌇 Sunset</p>

                  <strong>
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </strong>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
