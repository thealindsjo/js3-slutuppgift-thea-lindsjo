
"use client";
import React, { useEffect, useMemo, useState } from "react";
import CountrySearch from "./CountrySearch";
import CountriesList from "./CountryList";
import Pagination from "./Pagination";

export default function CountriesContainer({ initialCountries }: { initialCountries: any[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialCountries.filter((c: any) => {
      const matchesQuery = !q || c.name.common.toLowerCase().includes(q);
      const matchesRegion = region === "All" || !region ? true : c.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [initialCountries, query, region]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [query, region]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  return (
    <main>
      <CountrySearch query={query} onChange={setQuery} region={region} onRegionChange={setRegion} />

      <CountriesList countries={current} />

      <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
    </main>
  );
}