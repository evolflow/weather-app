import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");

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
          />

          <button>Search</button>
        </div>

        <h2>{city}</h2>
      </div>
    </div>
  );
}

export default App;
