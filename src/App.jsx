import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherHistory");
    const savedWeather = localStorage.getItem("weatherData");
    const savedCity = localStorage.getItem("weatherCity");
    const savedFavorites = localStorage.getItem("weatherFavorites");

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedWeather) setWeather(JSON.parse(savedWeather));
    if (savedCity) setCity(savedCity);
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("weatherHistory", JSON.stringify(history));
    }
  }, [history, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("weatherFavorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  useEffect(() => {
    if (loaded && weather) {
      localStorage.setItem("weatherData", JSON.stringify(weather));
      localStorage.setItem("weatherCity", weather.name);
    }
  }, [weather, loaded]);

  async function fetchWeather(cityName, addToHistory = true) {
    if (cityName.trim() === "") {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    setCity(cityName);
    setLoading(true);
    setError("");
    setWeather(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
        return;
      }

      setWeather(data);

      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      if (addToHistory) {
        setHistory((prevHistory) => {
          const filteredHistory = prevHistory.filter(
            (item) => item !== data.name,
          );

          return [data.name, ...filteredHistory].slice(0, 5);
        });
      }

      setError("");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  function getWeather() {
    fetchWeather(city, true);
  }

  function searchFromHistory(cityName) {
    fetchWeather(cityName, false);
  }

  function getWeatherIcon(condition) {
    if (condition === "Clear") return "☀️";
    if (condition === "Clouds") return "☁️";
    if (condition === "Rain") return "🌧";
    if (condition === "Snow") return "❄️";
    if (condition === "Thunderstorm") return "⛈";
    if (condition === "Drizzle") return "🌦";
    if (condition === "Mist") return "🌫";
    if (condition === "Fog") return "🌁";
    if (condition === "Haze") return "🌫";

    return "🌤";
  }

  function toggleFavorite() {
    if (!weather || !weather.name) return;

    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(weather.name)) {
        return prevFavorites.filter((item) => item !== weather.name);
      }

      return [...prevFavorites, weather.name];
    });
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

        {history.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => {
              setHistory([]);
              setFavorites([]);
              setWeather(null);
              setCity("");
              setLastUpdated("");

              localStorage.removeItem("weatherHistory");
              localStorage.removeItem("weatherFavorites");
              localStorage.removeItem("weatherData");
              localStorage.removeItem("weatherCity");
            }}
          >
            Clear All
          </button>
        )}

        <div className="history">
          {history.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                searchFromHistory(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {weather && weather.name && (
          <button className="favorite-btn" onClick={toggleFavorite}>
            {favorites.includes(weather.name)
              ? "❌ Remove from Favorites"
              : "⭐ Add to Favorites"}
          </button>
        )}

        {favorites.length > 0 && (
          <>
            <h3>⭐ Favorites</h3>

            <div className="history">
              {favorites.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    searchFromHistory(item);
                  }}
                >
                  ⭐ {item}
                </button>
              ))}
            </div>
          </>
        )}

        {error && <p className="error">{error}</p>}

        {loading && (
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Searching weather...</p>
          </div>
        )}

        {weather &&
          weather.main &&
          weather.weather &&
          weather.wind &&
          weather.sys && (
            <div className="weather-result">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>

              <h1>{getWeatherIcon(weather.weather[0].main)}</h1>

              <p>{Math.round(weather.main.temp)}°C</p>
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
              <p>{weather.weather[0].description}</p>
              {lastUpdated && <p>Last updated: {lastUpdated}</p>}

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

                <div className="detail-box">
                  <span>📊</span>
                  <p>Pressure</p>
                  <strong>{weather.main.pressure} hPa</strong>
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
