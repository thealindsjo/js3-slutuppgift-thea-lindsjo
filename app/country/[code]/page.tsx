import Image from "next/image";
import Link from "next/link";
import CountryFacts from "@/components/CountryFacts";
import ImageGallery from "@/components/ImageGallery";
import WikiIntro from "@/components/WikiIntro";
import WeatherCard from "@/components/WeatherCard";
import ErrorRetry from "@/components/ErrorRetry";
import { getCountryByCode, getCountryByName } from "@/lib/country";
import { getWikiSummary } from "@/lib/wiki";
import { getUnsplashImages } from "@/lib/unsplash";
import { getWorldBankPopulation } from "@/lib/worldbank";

type Props = { params: { code: string } };

export default async function Page({ params }: Props) {
  const id = params.code;
  if (!id) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Land</h1>
        <div>Inget land angivet</div>
      </main>
    );
  }

  try {
    let country = null;
    try {
      country = await getCountryByCode(id);
    } catch {
      country = await getCountryByName(id);
    }

    if (!country) throw new Error("Kunde inte hitta landet");

    const wiki = await getWikiSummary(country.name.common);
    const images = await getUnsplashImages(country.name.common, 8);
    const wbPopulation = country.cca2 ? await getWorldBankPopulation(country.cca2) : null;

    const latlng =
      country.capitalInfo?.latlng && country.capitalInfo.latlng.length === 2
        ? country.capitalInfo.latlng
        : country.latlng ?? null;

    return (
      <main className="p-8" aria-labelledby="country-heading">
                <header className="mb-6">
          <Link href="/countries" className="text-sm underline">← Tillbaka</Link>
          <h1 id="country-heading" className="text-3xl font-bold mt-3 flex items-center gap-4">
            <span className="inline-block w-12 h-8">
              <Image
                src={country.flags?.png || country.flags?.svg}
                alt={`Flagga för ${country.name.common}`}
                width={48}
                height={32}
                className="object-contain"
              />
            </span>
            {country.name.common}
            {country.name.official && <span className="text-sm font-light ml-2">({country.name.official})</span>}
          </h1>
        </header>

        <section aria-labelledby="facts-heading" className="grid gap-6 md:grid-cols-3">
          <aside className="md:col-span-1">
            <div className="sticky top-8">
              <CountryFacts country={country} wbPopulation={wbPopulation} />
              <h2 className="text-xl font-semibold mb-2">Väder</h2>
              {latlng ? (
                <WeatherCard country={country} />
              ) : (
                <div>Inga koordinater tillgängliga för att visa väder.</div>
              )}
            </div>
          </aside>

          <div className="md:col-span-2">
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Intro</h2>
              <WikiIntro wiki={wiki} name={country.name.common} />
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Bilder</h2>
              <ImageGallery images={images} fallbackName={country.name.common} />
            </div>
          </div>

        </section>
      </main>
    );
  } catch (e) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Fel</h1>
        <ErrorRetry message="Kunde inte ladda landets data. Försök igen." />
      </main>
    );
  }
}