import {
  FormControl,
  Input,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Country } from "../../types";
import "./index.css";

export interface ExchangeProps {
  selectedCountry: Country;
  countries: Country[];
}

const Exchange: FC<ExchangeProps> = ({ selectedCountry, countries }) => {
  const [rate, setRate] = useState<number>();
  const [exchangeCountry, setExchangeCountry] = useState<Country>(countries[0]);

  const [fromCurrency, setFromCurrency] = useState<number>(0);
  const [toCurrency, setToCurrency] = useState<number>(0);

  const selectedCountryCurrency = Object.keys(selectedCountry.currencies)[0];
  const exchangeCountryCurrency = Object.keys(exchangeCountry?.currencies)[0];

  useEffect(() => {
    axios
      .get(
        `https://api.exchangerate.host/convert?from=${selectedCountryCurrency}&to=${exchangeCountryCurrency}`
      )
      .then((response) => {
        setRate(response.data.result);
        setFromCurrency(0);
        setToCurrency(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCountry, exchangeCountry]);

  const fromChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const value = +e.target.value < 0 ? 0 : +e.target.value;
    e.target.value = value.toString();
    setFromCurrency(value);
    setToCurrency(+(value * (rate || 0)).toFixed(2));
  };

  const toChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const value = +e.target.value < 0 ? 0 : +e.target.value;
    e.target.value = value.toString();
    setToCurrency(value);
    setFromCurrency(+(value / (rate || 0)).toFixed(2));
  };

  return (
    <Paper elevation={1} className="exchange">
      <h1>Currency Exchange</h1>

      <Select
        variant="standard"
        labelId="currencySelectedCountry"
        id="currencySelectedCountry"
        value={exchangeCountry?.cca2}
        placeholder="Select Country"
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
            {country.name.common}
          </MenuItem>
        ))}
      </Select>

      <div className="exchange-inputs-wrapper">
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Input
            id="standard-adornment-amount"
            type="number"
            value={fromCurrency}
            onChange={fromChange}
            startAdornment={
              <InputAdornment position="start">
                {selectedCountry.currencies[selectedCountryCurrency].symbol}
              </InputAdornment>
            }
          />
        </FormControl>

        <h2>=</h2>

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Input
            id="standard-adornment-amount"
            type="number"
            value={toCurrency}
            onChange={toChange}
            startAdornment={
              <InputAdornment position="start">
                {exchangeCountry.currencies[exchangeCountryCurrency].symbol}
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </Paper>
  );
};

export default Exchange;
