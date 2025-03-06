import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./component/CountryList";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
      setSelectedCountry(null);
      setWeather(null);
    } else {
      setFilteredCountries([]);
    }
  }, [query, countries]);

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      const capital = selectedCountry.capital[0];
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
      axios
        .get(url)
        .then((response) => setWeather(response.data))
        .catch((error) => console.error("Error fetching weather:", error));
    }
  }, [selectedCountry]);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Info</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <CountryList
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        showCountry={handleShowCountry}
        weather={weather}
      />
    </div>
  );
};

export default App;
