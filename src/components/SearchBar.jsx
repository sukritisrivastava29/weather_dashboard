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
    setSuggestions
}) 
{
    return (
        <div className="w-full flex  gap-4 justify-center items-center">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}// whatever is inside state should appear inside the input(controlled input)
                   onChange={(e) => {
  const value = e.target.value;
  setCity(value);

  const filtered = cities.filter((cityName) =>
  cityName.toLowerCase().includes(value.toLowerCase())
);

  setSuggestions(filtered);
}}

                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        getWeather();
                        setSuggestions([]);
                    }
                }}
                className="
                border-2 border-gray-200 dark:border-gray-600
                p-4 rounded-xl w-56 md:w-64 outline-none shadow-md
                bg-white dark:bg-gray-800
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:border-blue-500 transition
                "
                />{suggestions.length > 0 && (
                <div
  className="
  absolute
  top-full
  left-0
  w-full
  bg-white
  rounded-xl
  shadow-lg
  mt-1
  z-50
  "
>
                    {suggestions.map((cityName) => (
  <div
    key={cityName}
    onClick={() => {
      setCity(cityName);
      setSuggestions([]);
      getWeather(cityName);
    }}
    className="p-2 cursor-pointer hover:bg-gray-100"
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