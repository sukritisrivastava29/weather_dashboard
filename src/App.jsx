import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [aqi, setAqi] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    const savedCities =
      JSON.parse(localStorage.getItem("cities")) || [];

    setRecentCities(
      savedCities.filter(city => city && city.trim())
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  function getInsights() {
    
  if (!weather) return [];

  const insights = [];

  if (weather.main.temp > 35)
    insights.push("🥤 Stay hydrated today");

  if (weather.main.temp < 15)
    insights.push("🧥 Consider carrying a jacket");

  if (weather.wind.speed > 10)
    insights.push("💨 Strong winds expected");

  if (weather.main.humidity > 80)
    insights.push("💧 High humidity today");

  if (weather.weather[0].main === "Rain")
    insights.push("☔ Carry an umbrella");

  if (insights.length === 0) {
  insights.push("✅ Weather conditions look pleasant today");
}

  return insights;
}

  async function getWeather(searchCity = city) {
    if (!searchCity.trim()) return;
    setError("");
    setLoading(true);
    const API_KEY = import.meta.env.VITE_WEATHER_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if ((data.cod !== 200 && data.cod !== "200")) {
      setWeather(null);
      setError(data.message);
      setLoading(false);
      return;
    }
    setError("");
    setWeather(data);
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    await fetchAQI(lat, lon, API_KEY);
    const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    setHourlyForecast(forecastData.list.slice(0, 8));
    const dailyForecast = forecastData.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    )
    setForecast(dailyForecast);

    const history = JSON.parse(localStorage.getItem("cities")) || [];
    if (
      searchCity.trim() &&
      !history.includes(searchCity)
    ) {
      history.push(searchCity);

      localStorage.setItem(
        "cities",
        JSON.stringify(history)
      );

      setRecentCities([...history]);
    }
    setLoading(false);
  }

  async function getWeatherByCoord(lat, lon) {
    const API_KEY = import.meta.env.VITE_WEATHER_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);

    const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    setHourlyForecast(forecastData.list.slice(0, 8));
    const dailyForecast = forecastData.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    setForecast(dailyForecast);
    await fetchAQI(lat, lon, API_KEY);
  }

  async function fetchAQI(lat, lon, API_KEY) {
    const aqiUrl =
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const aqiResponse = await fetch(aqiUrl);
    const aqiData = await aqiResponse.json();
    setAqi(aqiData);
  }

  function getCurrentLocation() {
    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await getWeatherByCoord(latitude, longitude);
        setLocationLoading(false);
      },
      (error) => {
        setError("unable to get your location");
        console.log(error);
        setLocationLoading(false);
      }
    );
  }
function getWeatherAlert() {
  if (!weather) return null;

  if (weather.main.temp > 40)
    return "🔥 Extreme heat warning";

  if (weather.wind.speed > 15)
    return "🌪️ High wind warning";

  if (weather.weather[0].main === "Thunderstorm")
    return "⛈️ Thunderstorm warning";

  return null;
}
  function getAQILabel(value) {
    switch (value) {
      case 1:
        return "😀 Good";
      case 2:
        return "🙂 Fair";
      case 3:
        return "😐 Moderate";
      case 4:
        return "😷 Poor";
      case 5:
        return "☠️ Very Poor";
      default:
        return "Unknown";
    }
  }

  function getAQIColor(value) {
    switch (value) {
      case 1:
        return "text-green-500";
      case 2:
        return "text-lime-500";
      case 3:
        return "text-yellow-500";
      case 4:
        return "text-orange-500";
      case 5:
        return "text-red-500";
      default:
        return "text-gray-500";
    }

  }

const insights = weather ? getInsights() : [];
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${darkMode
      ? "bg-gradient-to-br from-slate-900 to-slate-700"
      : "bg-gradient-to-br from-blue-400 to-cyan-200"
      }`}>
      <div
        className={`relative backdrop-blur-md p-4 md:p-8 rounded-3xl shadow-2xl text-center
max-w-screen-2xl w-full
${darkMode
            ? "bg-slate-800/80 text-white"
            : "bg-white/80 text-gray-800"
          }`}>
        <h1
          className={`text-3xl md:text-4xl font-extrabold mb-8 ${darkMode ? "text-white" : "text-gray-800"
            }`}
        >
          Weather Dashboard
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
absolute top-4 right-4
w-8 h-8
flex items-center justify-center
rounded-full
bg-white/20
backdrop-blur-md
shadow-lg
hover:scale-110
transition
">
          {darkMode ? "☀️ " : "🌙"}
        </button>

        <div className="w-full">
          <SearchBar
            city={city}
            setCity={setCity}
            getWeather={getWeather}
            getCurrentLocation={getCurrentLocation}
            locationLoading={locationLoading}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            darkMode={darkMode}
          />
        </div>
        {error && (
          <p className="text-red-500 mt-4">
            ❌ {error}
          </p>
        )}

        {loading && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
        {recentCities.length > 0 && (
          <div className="mt-6">
            <h2
              className={`text-xl font-semibold mb-3 ${darkMode ? "text-gray-200" : "text-gray-700"
                }`}
            >
              🕒 Recent Searches
            </h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {recentCities.map((cityName, index) => (
                <button
                  key={index}
                  onClick={() => getWeather(cityName)}
                  className={`
px-4 py-2 rounded-full shadow-md
hover:scale-105 transition
cursor-pointer
${darkMode
                      ? "bg-slate-700 text-white"
                      : "bg-white text-gray-800"}
`}>
                  {cityName}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("cities");
                setRecentCities([]);
              }}
              className={`
    mt-3 px-4 py-2 rounded-lg transition
    ${darkMode
                  ? "bg-red-900/40 text-red-300 hover:bg-red-900/60"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
                }
  `}
            >
              🗑️ Clear History
            </button>
          </div>)}
        {!weather && !loading && (
          <div className="mt-12 opacity-80">
            <h2 className="text-3xl font-bold">
              🌤️ Search Any City
            </h2>

            <p className="mt-3">
              Get weather, AQI, forecasts and smart insights.
            </p>
          </div>
        )}
        {weather && (
          <>
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <WeatherCard
                weather={weather}
                darkMode={darkMode}
              />

              {forecast.length > 0 && (
                <Forecast
                  forecast={forecast}
                  darkMode={darkMode}
                />
              )}
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <div
                className={`mt-6 p-6 rounded-2xl shadow-lg ${darkMode
                    ? "bg-slate-700 text-white"
                    : "bg-white text-gray-800"
                  }`}
              >
                <h3 className="text-2xl font-bold mb-4">
  💡 Today's Insights
</h3>

{insights.map((item, index) => (
  <div
    key={index}
    className={`mb-3 p-4 rounded-xl ${
      darkMode ? "bg-white/10" : "bg-gray-100"
    }`}
  >
    {item}
  </div>
))}
              </div>
              {aqi && (
                <div
                  className={`mt-6 p-6 rounded-2xl shadow-lg text-center border-l-4 ${aqi.list[0].main.aqi >= 4
                      ? "border-red-500"
                      : aqi.list[0].main.aqi === 3
                        ? "border-yellow-500"
                        : "border-green-500"
                    }`}
                >
                  <h3 className="text-3xl font-bold mb-2">
                    Air Quality Index
                  </h3>
                  <p
                    className={`text-3xl font-extrabold ${getAQIColor(
                      aqi.list[0].main.aqi
                    )}`}
                  >
                    {getAQILabel(aqi.list[0].main.aqi)}
                  </p>
                  <div className="mt-4 space-y-2 text-lg">
                    <p>
                      PM2.5: {Math.round(aqi.list[0].components.pm2_5)}
                    </p>

                    <p>
                      PM10: {Math.round(aqi.list[0].components.pm10)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {getWeatherAlert() && (
              <div className={`mt-6 p-4 rounded-xl font-bold ${darkMode
                ? "bg-red-900/30 text-red-300"
                : "bg-red-100 text-red-700"
                }`}>
                {getWeatherAlert()}
              </div>
            )}


            {hourlyForecast.length > 0 && (
              <HourlyForecast
                hourlyForecast={hourlyForecast}
                darkMode={darkMode} />
            )}
          </>
        )}
      </div>
    </div>

  );
}
export default App;