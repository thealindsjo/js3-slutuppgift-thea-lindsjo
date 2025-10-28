import Image from "next/image";
import Link from "next/link";
import CountryFacts from "@/components/CountryFacts";
import ImageGallery from "@/components/ImageGallery";
import WikiIntro from "@/components/WikiIntro";
import WeatherCard from "@/components/WeatherCard";
import ErrorRetry from "@/components/ErrorRetry";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getCountryByCode, getCountryByName } from "@/api/country";
import { getWikiSummary } from "@/api/wiki";
import { getUnsplashImages } from "@/api/unsplash";
import { getWorldBankPopulation } from "@/api/worldbank";

type Props = { params: Promise<{ code: string }> };

export default async function Page({ params }: Props) {
  const { code } = await params;
  if (!code) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Country</h1>
        <div>No country specified</div>
      </main>
    );
  }

  try {
    let country = null;
    try {
      country = await getCountryByCode(code);
    } catch {
      country = await getCountryByName(code);
    }

    if (!country) throw new Error("Could not find the country");

    const wiki = await getWikiSummary(country.name.common);
    const images = await getUnsplashImages(country.name.common, 8);
    const wbPopulation = country.cca2
      ? await getWorldBankPopulation(country.cca2)
      : null;

    const latlng =
      country.capitalInfo?.latlng && country.capitalInfo.latlng.length === 2
        ? country.capitalInfo.latlng
        : country.latlng ?? null;

    return (
      <>
        <section className="mb-6">
          <Link href="/countries" className="text-sm underline">
            ← Back
          </Link>
          <h1
            id="country-heading"
            className="text-3xl font-bold mt-3 flex items-center gap-4"
          >
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
            {country.name.official && (
              <span className="text-sm font-light ml-2">
                ({country.name.official})
              </span>
            )}
          </h1>
        </section>

        <section
          aria-labelledby="facts-heading"
          className="grid gap-6 md:grid-cols-3"
        >
          <aside className="md:col-span-1">
            <div className="sticky top-8">
              <CountryFacts country={country} wbPopulation={wbPopulation} />
              <h2 className="text-xl font-semibold mt-3">Weather</h2>
              <ErrorBoundary>
                {latlng ? (
                  <WeatherCard country={country} />
                ) : (
                  <div>No coordinates available to show weather.</div>
                )}
              </ErrorBoundary>
            </div>
          </aside>

          <div className="md:col-span-2">
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Introduction</h2>
              <ErrorBoundary>
                <WikiIntro wiki={wiki} name={country.name.common} />
              </ErrorBoundary>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Images</h2>
              <ErrorBoundary>
                <ImageGallery
                  images={images}
                  fallbackName={country.name.common}
                />
              </ErrorBoundary>
            </div>
          </div>
        </section>
      </>
    );
  } catch {
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <ErrorRetry message="Could not load country data. Please try again." />
      </>
    );
  }
}
