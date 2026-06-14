
import axios from "axios";
import { useState, useEffect } from "react";
import Country from "./components/Country";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]); 
  const [search, setSearch] = useState('');
  const [showCountry, setShowCountry] = useState(null); 

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(intlCountries => {
        setAllCountries(intlCountries.data);     
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setCountries([]);
      setShowCountry(null); 
      return;
    }
    const filteredCountries = allCountries.filter(c => 
      c.name?.common?.toLowerCase().includes(search.toLowerCase())
    );
    setCountries(filteredCountries);
    setShowCountry(null); 
  }, [search, allCountries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleToggleShow = (i) => {
    setShowCountry(prevIndex => (prevIndex === i ? null : i));
  };
  

  return (
    <div className="search">
      <label htmlFor="search">Search for a Country:</label>
      <input type="text" id="search" onChange={handleSearchChange} value={search} placeholder="Type here..." />

      <div className="country">
        {countries.length === 1 && <Country country={countries[0]} />}
        
        {countries.length > 10 && (
          <p className="country-warning">Too many matches, specify the country you want to search!</p>
        )}

        {countries.length > 1 && countries.length <= 10 && (
          countries.map((country, i) => (
            <div key={country.cca3 || i} className="suggestion-row">
              <p className="suggestion-content">
                {country?.name?.common}
                {" "}
                <button onClick={() => handleToggleShow(i)} className="toggle-btn">
                  {showCountry === i ? "hide" : "show"}
                </button>
              </p>
              {showCountry === i && <Country country={country} />}
            </div>
          ))
        )}
      </div>

      <p>Developed by Althea Mae Almedilla</p>
      <p>Github Account: Yangalmedev</p>
      <p className="cta">Click below for the GitHub Repository</p>
      <a href="https://github.com/Yangalmedev/QckCountry">
        https://github.com/Yangalmedev/QckCountry
      </a>
    </div>
  );
};

export default App;
