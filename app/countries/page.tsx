import Link from "next/link";
import { fetchCountries } from "@/lib/fetchCountries";

export default async function CountriesPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const allCountries = await fetchCountries();

  const pageSize = 10;
  const page = Number(searchParams?.page ?? 1);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const countries = allCountries.slice(start, end);

  const totalPages = Math.ceil(allCountries.length / pageSize);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Countries</h1>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <li key={country.cca3} className="border rounded-lg p-4">
            <Link href={`/info/${country.cca3}`}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-16 h-auto mb-2"
              />
              <h2 className="font-semibold">{country.name.common}</h2>
              <p>Region: {country.region}</p>
              {country.capital && <p>Capital: {country.capital[0]}</p>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-6">
        <Link
          href={`/countries?page=${page - 1}`}
          className={`px-3 py-1 border rounded ${
            page <= 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Previous
        </Link>

        <span>
          Page {page} of {totalPages}
        </span>

        <Link
          href={`/countries?page=${page + 1}`}
          className={`px-3 py-1 border rounded ${
            page >= totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
