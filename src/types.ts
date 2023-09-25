export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  code: string;
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  capital: string;
  region: string;
  population: number;
  flags: {
    png: string;
  };

  continents: string[];
  borders: string[];
}

export type Tab = "exchange" | "airports";

export interface Airport {
  name: string;
}
