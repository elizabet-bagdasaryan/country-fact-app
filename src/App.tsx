import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Country } from "./types";
import CountryWrapper from "./Components/CountryWrapper";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const fetchCountryFromCoordinates = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const apiKey = "AIzaSyCXcs0L-VJY1OzmdlIDfKm8ZjvOF_8dr38";

        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );

        if (response.data.status === "OK") {
          const results = response.data.results;
          if (results && results.length > 0) {
            const countryData = results[
              results.length - 1
            ].address_components.find((component: { types: string }) =>
              component.types.includes("country")
            );

            if (countryData) {
              const country = countries.find(
                (country) => country.cca2 === countryData.short_name
              );

              if (country) {
                setSelectedCountry(country);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [countries]
  );

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(
          response.data.sort((country1, country2) => {
            const nameA = country1.name.common.toUpperCase();
            const nameB = country2.name.common.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation && countries.length > 0) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchCountryFromCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => console.log("Error getting location: " + error.message)
      );
    }
  }, [countries, fetchCountryFromCoordinates]);

  return (
    <Container maxWidth="lg" className="container">
      <FormControl fullWidth>
        <InputLabel id="selectedCountry">Country</InputLabel>
        <Select
          labelId="selectedCountry"
          id="selectedCountry"
          value={
            countries.length > 0 ? selectedCountry?.cca2 || "_" : "loading"
          }
          placeholder="Select Country"
          label="Country"
          onChange={(e) => {
            const country = countries.find(
              (country) => country.cca2 === e.target.value
            );

            if (country) {
              setSelectedCountry(country);
            }
          }}
        >
          <MenuItem value="_">Select Country</MenuItem>
          {countries.length > 0 ? (
            countries.map((country) => (
              <MenuItem value={country.cca2} key={country.cca2}>
                {country.name.common}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="loading">Loading Countries</MenuItem>
          )}
        </Select>
      </FormControl>
      {selectedCountry && (
        <CountryWrapper
          selectedCountry={selectedCountry}
          countries={countries}
        />
      )}
    </Container>
  );
}

export default App;
