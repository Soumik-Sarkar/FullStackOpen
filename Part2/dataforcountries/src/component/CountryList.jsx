const CountryList = ({ countries, selectedCountry, showCountry, weather }) => {
  if (countries.length === 0) return null;

  if (countries.length > 10)
    return <p>Too many matches, please specify your search.</p>;

  if (countries.length === 1 || selectedCountry) {
    const country = selectedCountry || countries[0];
    return (
      <>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="200"
        />
        {weather && (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {countries.map((c) => (
        <div key={c.cca3}>
          {c.name.common}
          <button onClick={() => showCountry(c)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default CountryList;
