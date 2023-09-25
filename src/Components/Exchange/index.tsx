import { MenuItem, Paper, Select, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Country } from "../../types";

export interface ExchangeProps {
  selectedCountry: Country;
  countries: Country[];
}

const Exchange: FC<ExchangeProps> = ({ selectedCountry, countries }) => {
  const [rate, setRate] = useState<number>();
  const [exchangeCountry, setExchangeCountry] = useState<Country>(countries[0]);

  const [fromCurrency, setFromCurrency] = useState<number>();
  const [toCurrency, setToCurrency] = useState<number>();

  const selectedCountryCurrency = Object.keys(selectedCountry.currencies)[0];
  const exchangeCountryCurrency = Object.keys(exchangeCountry?.currencies)[0];

  useEffect(() => {
    axios
      .get(
        `https://api.exchangerate.host/convert?from=${selectedCountryCurrency}&to=${exchangeCountryCurrency}`
      )
      .then((response) => {
        setRate(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCountry, exchangeCountry]);

  const fromChange = (e: any) => {
    setFromCurrency(e.target.value);
    setToCurrency(e.target.value * (rate || 0));
  };

  const toChange = (e: any) => {
    setToCurrency(e.target.value);
    setFromCurrency(e.target.value / (rate || 0));
  };

  return (
    <Paper elevation={1} style={{ margin: "24px 0", padding: "16px" }}>
      <h1 style={{ fontWeight: 400, margin: "0" }}>Currency Exchange</h1>

      <Select
        variant="standard"
        labelId="selectedCountry"
        id="selectedCountry"
        value={exchangeCountry?.cca2}
        placeholder="Select Country"
        style={{ width: "300px", margin: "16px 0" }}
        label="Country"
        onChange={(e) => {
          const country = countries.find(
            (country) => country.cca2 === e.target.value
          );

          if (country) {
            setExchangeCountry(country);
          }
        }}
      >
        <MenuItem value="_">Select Country</MenuItem>
        {countries.map((country) => (
          <MenuItem value={country.cca2} key={country.cca2}>
            {country.name.official}
          </MenuItem>
        ))}
      </Select>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label={`From ${selectedCountry.currencies[selectedCountryCurrency].symbol}`}
          variant="standard"
          type="number"
          value={fromCurrency}
          onChange={fromChange}
        />

        <h2>=</h2>

        <TextField
          label={`To ${exchangeCountry.currencies[exchangeCountryCurrency].symbol}`}
          variant="standard"
          type="number"
          value={toCurrency}
          onChange={toChange}
        />
      </div>
    </Paper>
  );
};

export default Exchange;
