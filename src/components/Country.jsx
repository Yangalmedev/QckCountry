import Weather from "./WeatherView";

const Country = ({ country }) => {
  console.log(country);

  return (
    <div className="data">
      <h2>{country?.name?.common}</h2>
      <div className="country-stats">
        <p><span>Capital: </span>{country?.capital}</p>
        <p><span>Area: </span>{country?.area}</p>
      </div>

      <div className="languages-section">
        <h3>languages:</h3>
        <ul>
          {Object.values(country?.languages || {}).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>

      <img src={country?.flags?.png} alt={country?.flags?.alt} className="flag-img" />
      <Weather country={country} />
    </div>
  );

};

export default Country;