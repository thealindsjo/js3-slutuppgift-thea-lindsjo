export async function getWikiSummary(title: string) {
  try {
    const t = encodeURIComponent(title);
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${t}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}