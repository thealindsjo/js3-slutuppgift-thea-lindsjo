
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface Props {
  page: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (p: number) => void;
}

export default function Pagination({ page, totalPages, basePath = "/countries", onPageChange }: Props) {
  const [loading, setLoading] = useState(false);
  const prev = page - 1;
  const next = page + 1;

  const handleClick = (p: number) => {
    if (!onPageChange) return;
    setLoading(true);
    onPageChange(p);
    setTimeout(() => setLoading(false), 300);
  };

  if (onPageChange) {
    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          onClick={() => handleClick(prev)}
          disabled={page <= 1 || loading}
          className={`px-3 py-1 border rounded ${page <= 1 ? "opacity-50" : ""}`}
          aria-label="Gå till föregående sida"
        >
          {loading && page > 1 ? <Spinner /> : "Föregående sida"}
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          onClick={() => handleClick(next)}
          disabled={page >= totalPages || loading}
          className={`px-3 py-1 border rounded ${page >= totalPages ? "opacity-50" : ""}`}
          aria-label="Gå till nästa sida"
        >
          {loading && page < totalPages ? <Spinner /> : "Nästa sida"}
        </Button>
      </div>
    );
  }
}