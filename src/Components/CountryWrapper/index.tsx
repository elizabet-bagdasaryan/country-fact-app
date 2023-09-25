import { Country, Tab } from "../../types";
import { FC, useState } from "react";
import CountryInfo from "../CountryInfo";
import { Tab as TabComponent, Tabs } from "@mui/material";
import Airports from "../Airports";
import Exchange from "../Exchange";

export interface CountryWrapperProps {
  selectedCountry: Country;
  countries: Country[];
}

const CountryWrapper: FC<CountryWrapperProps> = ({
  selectedCountry,
  countries,
}) => {
  const [currentTab, setCurrentTab] = useState<Tab>("exchange");

  return (
    <>
      <CountryInfo selectedCountry={selectedCountry} countries={countries} />

      <Tabs
        value={currentTab === "exchange" ? 0 : 1}
        onChange={(_event: React.SyntheticEvent, tab: number) => {
          setCurrentTab(tab === 0 ? "exchange" : "airports");
        }}
      >
        <TabComponent label="Currency Exchange" />
        <TabComponent label="Airports" />
      </Tabs>

      <div hidden={currentTab !== "exchange"}>
        <Exchange selectedCountry={selectedCountry} countries={countries} />
      </div>

      <div hidden={currentTab !== "airports"}>
        <Airports currentTab={currentTab} countryCode={selectedCountry.cca2} />
      </div>
    </>
  );
};

export default CountryWrapper;
