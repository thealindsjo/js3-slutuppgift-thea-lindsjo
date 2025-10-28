import { Country } from "@/types/country";

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2,cca3,latlng,capitalInfo"
  );

  if (!res.ok) {
    throw new Error("Could not fetch countries");
  }

  const data = await res.json();
  return data.sort((a: Country, b: Country) =>
    a.name.common.localeCompare(b.name.common)
  );
}
