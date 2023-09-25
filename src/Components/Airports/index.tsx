import { Grid, Paper, Skeleton, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Airport } from "../../types";
import axios from "axios";
import "./index.css";

export interface AirportsProps {
  countryCode?: string;
  currentTab: string;
}
const AIRPORTS_API_KEY = "vxFEkuQjSEJYO6KIrJ3hig==z2GqVtye06574Ffw";

const Airports: FC<AirportsProps> = ({ countryCode, currentTab }) => {
  const [airportsCountry, setAirportsCountry] = useState<string>();
  const [airports, setAirports] = useState<Airport[]>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (countryCode && airportsCountry !== countryCode) {
      setAirports(undefined);

      const airportsApiUrl = `https://api.api-ninjas.com/v1/airports?country=${countryCode}`;
      axios
        .get(airportsApiUrl, {
          headers: {
            "X-Api-Key": AIRPORTS_API_KEY,
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
    <Paper elevation={1} className="airports">
      <h1>Airports</h1>

      <TextField
        label="Search for Airport"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid
        container
        rowSpacing={1}
        mt={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {filteredAirports
          ? filteredAirports.map((airport) => (
              <Grid
                key={airport.name}
                item
                xs={12}
                sm={6}
                className="airports-grid"
              >
                <p className="airport-name">{airport.name}</p>
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
