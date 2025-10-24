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
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </ul>
  );
}
