export async function getWorldBankPopulation(cca2: string) {
  try {
    const c = encodeURIComponent(cca2.toLowerCase());
    const res = await fetch(`https://api.worldbank.org/v2/country/${c}/indicator/SP.POP.TOTL?format=json&per_page=60`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const series = json?.[1] ?? [];
    for (let i = 0; i < series.length; i++) {
      if (series[i].value != null) return series[i].value;
    }
    return null;
  } catch {
    return null;
  }
}