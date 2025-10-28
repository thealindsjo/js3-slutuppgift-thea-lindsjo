import { UnsplashImage } from "@/types/unsplash";

export async function getUnsplashImages(
  query: string,
  per_page = 8
): Promise<UnsplashImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];

  try {
    const q = encodeURIComponent(query);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${q}&per_page=${per_page}&client_id=${key}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const json = await res.json();

    return (json.results || [])
      .slice(0, per_page)
      .map(
        (it: {
          id: string;
          urls?: { regular: string };
          alt_description?: string;
        }) => ({
          id: it.id,
          url: it.urls?.regular || "",
          alt: it.alt_description || query,
        })
      );
  } catch {
    return [];
  }
}
