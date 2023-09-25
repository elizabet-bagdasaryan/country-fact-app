import { Grid, Paper } from "@mui/material";
import { Country } from "../../types";
import { FC } from "react";
import "./index.css";

export interface CountryInfoProps {
  selectedCountry: Country;
  countries: Country[];
}

const CountryInfo: FC<CountryInfoProps> = ({ selectedCountry, countries }) => {
  const borders = selectedCountry.borders
    ?.map(
      (border) =>
        countries.find((country) => country.cca3 === border)?.name.common
    )
    .join(", ");

  return (
    <Paper elevation={2} className="country-info">
      <div className="header">
        <h1>{selectedCountry.name.official} </h1>
        <img alt="country flag" src={selectedCountry.flags.png} />
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} className="grid-item">
          <p className="key">Capital:</p> {selectedCountry.capital?.[0]}
        </Grid>
        <Grid item xs={12} sm={6} className="grid-item">
          <p className="key">Continent:</p>{" "}
          {selectedCountry.continents?.join(", ")}
        </Grid>
        <Grid item xs={12} sm={6} className="grid-item">
          <p className="key">Currency:</p>{" "}
          {Object.keys(selectedCountry.currencies).join(", ")}
        </Grid>
        <Grid item xs={12} sm={6} className="grid-item">
          <p className="key">Population:</p>{" "}
          {selectedCountry.population.toLocaleString("en-US")}
        </Grid>
        <Grid item xs={12} sm={6} className="grid-item">
          <p className="key">Region:</p> {selectedCountry.region}
        </Grid>
        <Grid item xs={12} sm={6} className="grid-item">
          <p className="key">Borders:</p> <p>{borders}</p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CountryInfo;
