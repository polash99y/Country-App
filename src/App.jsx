import React, { useEffect, useState } from "react";

import "./App.css";
import Countries from "./components/Countries";
import Search from "./components/Search";

const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) => {
    setIsloading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsloading(false);
      setError(null);
    } catch (error) {
      setIsloading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter(
      (country) => country.name.common !== name
    );
    setFilteredCountries(filter);
  };

  const handleSearch = (searchValue) => {
    const value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountries(newCountries);
  };

  return (
    <>
      <h1>Country App</h1>
      <Search onSearch={handleSearch} />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && (
        <Countries
          countries={filteredCountries}
          onRemoveCountry={handleRemoveCountry}
        />
      )}
    </>
  );
};

export default App;
