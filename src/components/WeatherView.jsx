import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country?.capital) return;
    setError(null);
    setWeather(null);

    weatherService
      .getInfo(country.capital)
      .then((res) => setWeather(res.data))
      .catch(() => setError("Error fetching weather data."));
  }, [country?.capital]);

  
  
  if (error)
    return (
  <p
  style={{
    color: "red",
    background: "lightgrey",
    fontSize: "16px",
    borderStyle: "solid",
    borderRadius: "5px",
    marginTop: "46px",
    padding: "6px",
    marginBottom: "10px",
  }}
  >
        {error}
      </p>
    );
    
    if (!weather) {
      return <p>Loading weather data...</p>;
    }
    
    const iCode = weather?.weather?.[0]?.icon;
    console.log(weather);
    const iUrl = iCode ? `https://openweathermap.org/img/wn/${iCode}@2x.png` : "";
    const imgAlt = weather.weather?.[0]?.description || "Weather icon";
    
  return (
    <div className="weather-card">
      {Object.keys(weather || {}).length > 0 ? (
        <>
          <h3>Weather in Capital City ({country?.capital})</h3>
          <div className="weather-grid">
            <p className="weather-temp">temperature {weather?.main?.temp} Celsius</p>
            <img src={iUrl} alt={imgAlt} className="weather-icon" />
            <p className="weather-wind">wind {weather?.wind?.speed} m/s</p>
          </div>
        </>
      ) : (
        <p className="weather-loading">Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;