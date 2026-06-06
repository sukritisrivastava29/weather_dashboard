
import { WiSunrise, WiSunset } from "react-icons/wi";
function WeatherCard({ weather, darkMode }) {
   function formatTime(tiemstamp){
    return new Date(tiemstamp* 1000).toLocaleTimeString([], // js uses milliseconds while we need seconds
        {
            hour:"numeric",
            minute:"2-digit",
            hour12:true,
        }
    );
   }


    return (
       <div
  className={`
    w-full
    h-full
    rounded-3xl
    p-6
    shadow-xl
    text-center
    ${darkMode
      ? "bg-slate-600 text-white"
      : "bg-white text-gray-800"}
  `}
>
            <img className="w-36 h-36 mx-auto"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
            <h2 className="text-4xl font-bold">
                {weather.name},{weather.sys.country}
            </h2>

           <p className="text-7xl font-extrabold my-3">
                {Math.round(weather.main.temp)}°C
            </p>

            <p
                className={`text-lg capitalize ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
            >
                {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
                <div
                    className={`p-3 rounded-xl text-center hover:scale-105 transition ${darkMode
                            ? "bg-slate-600"
                            : "bg-blue-50"
                        }`}
                >
                    <p className="text-xl">💧</p>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-semibold">{weather.main.humidity}%</p>
                </div>

                <div
                    className={`p-3 rounded-xl text-center hover:scale-105 transition ${darkMode
                            ? "bg-slate-600"
                            : "bg-blue-50"
                        }`}
                >
                    <p className="text-xl">💨</p>
                    <p className="text-sm text-gray-500">Wind</p>
                    <p className="font-semibold">{weather.wind.speed} m/s</p>
                </div>

                <div
                    className={`p-3 rounded-xl text-center hover:scale-105 transition ${darkMode
                            ? "bg-slate-600"
                            : "bg-blue-50"
                        }`}
                >
                    <p className="text-xl">🌡️</p>
                    <p className="text-sm text-gray-500">Feels Like</p>
                    <p className="font-semibold">
                        {Math.round(weather.main.feels_like)}°C
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
 <div className={`p-3 rounded-xl ${darkMode ? "bg-slate-600" : "bg-yellow-50"}`}>
  <WiSunrise size={40} className="mx-auto" />
  <p className="text-sm">Sunrise</p>
  <p className="font-semibold">
    {formatTime(weather.sys.sunrise)}
  </p>
</div>

<div className={`p-3 rounded-xl ${darkMode ? "bg-slate-600" : "bg-orange-50"}`}>
  <WiSunset size={40} className="mx-auto" />
  <p className="text-sm">Sunset</p>
  <p className="font-semibold">
    {formatTime(weather.sys.sunset)}
  </p>
</div>
  </div>
</div>
       
    )
}
export default WeatherCard
