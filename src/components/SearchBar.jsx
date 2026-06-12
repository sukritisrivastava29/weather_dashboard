const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Lucknow",
  "Gorakhpur",
  "Noida",
  "Kanpur",
  "Jaipur"
];
function SearchBar({
    city,
    setCity,
    getWeather,
    getCurrentLocation,
    locationLoading,
    suggestions,
    setSuggestions,
    darkMode
}) 
{
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <div className="relative">
               <input
  type="text"
  placeholder="Enter City"
  value={city}
  onChange={(e) => {
    const value = e.target.value;
    setCity(value);

    const filtered = cities.filter((cityName) =>
      cityName.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(
      value.trim() === "" ? [] : filtered
    );
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      getWeather();
      setSuggestions([]);
    }
  }}
  className={`
    border-2 p-4 rounded-xl w-full outline-none shadow-md sm:w-auto
    focus:border-blue-500 transition
    ${
      darkMode
        ? "border-gray-600 bg-slate-700 text-white placeholder-gray-300"
        : "border-gray-200 bg-white text-black placeholder-gray-500"
    }
  `}
/>{suggestions.length > 0 && (
  <div
    className={`
      absolute top-full left-0 w-full mt-1 z-50
      rounded-xl shadow-lg overflow-hidden
      ${
        darkMode
          ? "bg-slate-700 border border-slate-600"
          : "bg-white border border-gray-200"
      }
    `}
  >
    {suggestions.map((cityName) => (
      <div
        key={cityName}
        onClick={() => {
          setCity(cityName);
          setSuggestions([]);
          getWeather(cityName);
        }}
        className={`
          px-4 py-3 cursor-pointer transition
          ${
            darkMode
              ? "text-white hover:bg-slate-600"
              : "text-black hover:bg-gray-100"
          }
        `}
      >
        {cityName}
      </div>
    ))}
  </div>
)}</div>
            
            <button
                className="bg-blue-500 text-white px-6 py-3 rounded-xl
                 hover:bg-blue-600 hover:scale-105 transition"
                onClick={() => {
                    console.log("Button clicked");
                    getWeather();
                    setSuggestions([]);
                }}
            >
                Search
            </button>
            <button
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="
    bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600  hover:scale-105 transition transition disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  "
            >
                {locationLoading ? "⏳ Locating..." : "📍 My Location"}
            </button></div>
    )
}
export default SearchBar