function HourlyForecast({ hourlyForecast, darkMode }) {
  return (
    <div
      className={`mt-6 p-6 rounded-2xl ${
        darkMode
          ? "bg-slate-700 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <h3 className="text-2xl font-bold mb-4">
        Hourly Forecast
      </h3>

      <div className="flex flex-wrap justify-center gap-4">
        {hourlyForecast.map((hour, index) => (
          <div
            key={index}
            className="min-w-[110px] shadow-md p-4 rounded-xl hover:scale-105 transition bg-white/20"
          >
            <p className="font-semibold">
              {new Date(hour.dt_txt).toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})}
            </p>
            <img
  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
  alt={hour.weather[0].description}
  className="mx-auto w-12 h-12"
/>

            <p className="text-2xl font-bold">
              {Math.round(hour.main.temp)}°C
            </p>

            <p>{hour.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;