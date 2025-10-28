/**
 * CountriesContainer Component
 *
 * Main container for the countries list page. Handles search functionality,
 * region filtering, pagination, and URL parameter synchronization.
 * Manages client-side state while preserving search parameters in the URL.
 */

"use client";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CountrySearch from "./CountrySearch";
import CountriesList from "./CountryList";
import Pagination from "./Pagination";
import { Country } from "@/types/country";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props {
  initialCountries: Country[];
  pageSize?: number;
}

export default function CountriesContainer({
  initialCountries,
  pageSize = 12,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQuery = (searchParams.get("q") ?? "").trim();
  const initialRegion = (searchParams.get("region") ?? "All") || "All";
  const initialPage = Number(searchParams.get("page") ?? "1") || 1;

  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length > 100) {
      setError("Search string can be at most 100 characters.");
    } else {
      setError(null);
    }
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialCountries.filter((c: Country) => {
      const matchesQuery = !q || c.name.common.toLowerCase().includes(q);
      const matchesRegion =
        region === "All" || !region ? true : c.region === region;
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

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (region && region !== "All") params.set("region", region);
    if (page && page > 1) params.set("page", String(page));

    const newQs = params.toString();
    if (newQs !== (searchParams.toString() || "")) {
      const url = newQs ? `${pathname}?${newQs}` : pathname;
      router.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, region, page, router, pathname]);

  const start = (page - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  return (
    <main>
      <CountrySearch
        query={query}
        onChange={setQuery}
        region={region}
        onRegionChange={setRegion}
      />

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      {filtered.length === 0 ? (
        <div className="mt-4 text-center text-gray-700">
          No countries match your search
        </div>
      ) : (
        <>
          <ErrorBoundary>
            <CountriesList countries={current} />
          </ErrorBoundary>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </main>
  );
}
