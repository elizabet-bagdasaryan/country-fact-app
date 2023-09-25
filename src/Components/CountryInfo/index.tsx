import { Grid, Paper } from "@mui/material";
import { Country } from "../../types";
import { FC } from "react";

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
    <Paper elevation={2} style={{ margin: "24px 0", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1 style={{ fontWeight: 400, margin: "0" }}>
          {selectedCountry.name.official}{" "}
        </h1>
        <img
          alt="country flag"
          src={selectedCountry.flags.png}
          style={{ height: "30px", marginLeft: "16px" }}
        />
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: 600, width: "110px", margin: "5px 0" }}>
            Capital:
          </p>{" "}
          {selectedCountry.capital?.[0]}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: 600, width: "110px", margin: "5px 0" }}>
            Continent:
          </p>{" "}
          {selectedCountry.continents?.join(", ")}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: 600, width: "110px", margin: "5px 0" }}>
            Currency:
          </p>{" "}
          {Object.keys(selectedCountry.currencies).join(", ")}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: 600, width: "110px", margin: "5px 0" }}>
            Population:
          </p>{" "}
          {selectedCountry.population.toLocaleString("en-US")}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: 600, width: "110px", margin: "5px 0" }}>
            Region:
          </p>{" "}
          {selectedCountry.region}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: 600, width: "110px", margin: "5px 0" }}>
            Borders:
          </p>{" "}
          {borders}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CountryInfo;
