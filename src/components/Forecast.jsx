function Forecast({ forecast, darkMode }) {
    return (
        <div
  className={`h-full
    backdrop-blur-md
    border
    rounded-3xl
    p-6
    shadow-xl
    ${
      darkMode
        ? "bg-slate-7600 border-slate-600 text-white"
        : "bg-white/50 border-white/30 text-gray-800"
    }
  `}
>
          <h2
  className={`text-2xl font-bold text-center mb-6 ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
                5-Day Forecast
            </h2>
            <div className="flex gap-5 justify-center flex-wrap">
                {forecast.map((day) => (
                    <div
                        key={day.dt}
                       className={`
  backdrop-blur-md
  p-3
  rounded-2xl
  shadow-md
  w-[110px]
  text-center
  hover:scale-105
  transition
  ${
    darkMode
      ? "bg-slate-500 border border-slate-500 text-white"
      : "bg-white/80 border border-white/30 text-gray-800"
  }
`}>
                       <p
  className={`font-bold ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`}
>
                            {new Date(day.dt_txt)
                                .toLocaleDateString("en-US", {
                                    weekday: "short",
                                })}
                        </p>

                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt=""
                            className="mx-auto w-16 h-16"
                        />

                        <p className="text-xl font-bold">
                            {Math.round(day.main.temp)}°C
                        </p>

                        <p className="text-sm">
                            {day.weather[0].main}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;