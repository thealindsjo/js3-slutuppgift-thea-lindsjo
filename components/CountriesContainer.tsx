"use client";
import React, { useEffect, useMemo, useState } from "react";
import CountrySearch from "./CountrySearch";
import CountriesList from "./CountryList";
import Pagination from "./Pagination";

export default function CountriesContainer({ initialCountries }: { initialCountries: any[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // filtrera och sortera (antar redan sorterat, men säkerställ)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = initialCountries.filter((c: any) =>
      c.name.common.toLowerCase().includes(q)
    );
    return list;
  }, [initialCountries, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Om query ändras, återställ till första sidan
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Om nuvarande sida är utanför range (tex efter filter) så justera
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  return (
    <main>
      <CountrySearch query={query} onChange={setQuery} />

      <CountriesList countries={current} />

      <Pagination
        page={page}
        totalPages={totalPages}
        // använder client-side handler i stället för Link
        onPageChange={(p) => setPage(p)}
      />
    </main>
  );
}