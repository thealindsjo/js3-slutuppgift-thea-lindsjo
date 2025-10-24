import CountryCard from "./CountryCard";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}

export default function CountriesList({ countries }: { countries: Country[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </ul>
  );
}