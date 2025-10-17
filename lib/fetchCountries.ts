export async function fetchCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2,cca3"
  );

  if (!res.ok) {
    throw new Error("Kunde inte hämta länder");
  }

  const data = await res.json();
  return data.sort((a: any, b: any) =>
    a.name.common.localeCompare(b.name.common)
  );
}
