export async function getCountryByCode(code: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}?fields=name,flags,region,subregion,capital,population,languages,currencies,capitalInfo,cca2,cca3,latlng`,
    { next: { revalidate: 120 } }
  );
  if (!res.ok) throw new Error("Kunde inte hämta landet (code)");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function getCountryByName(name: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true&fields=name,flags,region,subregion,capital,population,languages,currencies,capitalInfo,cca2,cca3,latlng`,
    { next: { revalidate: 120 } }
  );
  if (!res.ok) throw new Error("Kunde inte hämta landet (name)");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function getAllCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2,cca3,latlng,capitalInfo",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Kunde inte hämta länder");
  const data = await res.json();
  return data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
}