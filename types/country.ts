export interface Country {
  cca2: string;
  cca3: string;
  name: {
    common: string;
    official?: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  languages?: Record<string, string>;
  currencies?: Record<
    string,
    {
      name: string;
      symbol?: string;
    }
  >;
  capitalInfo?: {
    latlng?: [number, number];
  };
  latlng?: [number, number];
}