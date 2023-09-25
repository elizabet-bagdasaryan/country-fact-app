import { Grid, Paper, Skeleton, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Airport } from "../../types";
import axios from "axios";

export interface AirportsProps {
  countryCode?: string;
  currentTab: string;
}

const Airports: FC<AirportsProps> = ({ countryCode, currentTab }) => {
  const [airportsCountry, setAirportsCountry] = useState<string>();
  const [airports, setAirports] = useState<Airport[]>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (countryCode && airportsCountry !== countryCode) {
      setAirports(undefined);
      const apiUrl = `https://api.api-ninjas.com/v1/airports?country=${countryCode}`;
      const apiKey = "vxFEkuQjSEJYO6KIrJ3hig==z2GqVtye06574Ffw";

      axios
        .get(apiUrl, {
          headers: {
            "X-Api-Key": apiKey,
          },
        })
        .then((response) => {
          setAirports(response.data);
          setAirportsCountry(countryCode);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  }, [currentTab, countryCode]);

  const filteredAirports = airports?.filter((airport) => {
    return airport.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Paper elevation={1} style={{ margin: "24px 0", padding: "16px" }}>
      <h1 style={{ fontWeight: 400, margin: "0" }}>Airports</h1>

      <TextField
        label="Search for Airport"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "16px 0" }}
      />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {filteredAirports
          ? filteredAirports.map((airport) => (
              <Grid
                key={airport.name}
                item
                xs={12}
                sm={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p style={{ margin: "5px 0" }}>{airport.name}</p>
              </Grid>
            ))
          : new Array(4).fill(0).map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
            ))}
      </Grid>
    </Paper>
  );
};

export default Airports;
