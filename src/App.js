import "./App.css";
import { createContext, useEffect, useState } from "react";
import Country from "./components/Country";

export const countryContext = createContext();

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <countryContext.Provider value={{countries, setCountries}}>
      <Country countries={countries} />
    </countryContext.Provider>
  );
}

export default App;
