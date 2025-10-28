import React from "react";
import { Country } from "@/types/country";

export default function CountryFacts({
  country,
  wbPopulation,
}: {
  country: Country;
  wbPopulation?: number | null;
}) {
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "—";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol ?? ""})`)
        .join(", ")
    : "—";

  return (
    <section
      aria-labelledby="facts-heading"
      className="bg-white p-4 rounded shadow-sm"
    >
      <h2 id="facts-heading" className="text-xl font-semibold mb-2">
        Facts
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="font-medium">Region</dt>
          <dd>{country.region ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-medium">Subregion</dt>
          <dd>{country.subregion ?? "—"}</dd>
        </div>

        <div>
          <dt className="font-medium">Capital</dt>
          <dd>{(country.capital && country.capital[0]) || "—"}</dd>
        </div>

        <div>
          <dt className="font-medium">Population</dt>
          <dd>
            {country.population || wbPopulation
              ? (country.population ?? wbPopulation)!.toLocaleString()
              : "—"}
          </dd>
        </div>

        <div>
          <dt className="font-medium">Language</dt>
          <dd>{languages}</dd>
        </div>

        <div>
          <dt className="font-medium">Currency</dt>
          <dd>{currencies}</dd>
        </div>
      </dl>
    </section>
  );
}
