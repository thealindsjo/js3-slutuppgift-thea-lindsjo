/**
 * Pagination Component
 *
 * Provides navigation controls for paginated content with Previous/Next buttons.
 * Displays current page information and handles page transitions with loading states.
 * Includes disabled states for boundary pages and hover effects for better UX.
 */

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface Props {
  page: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (p: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
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
          className={`px-3 py-1 border rounded bg-gray-800 text-white hover:bg-gray-600 hover:text-white transition-colors cursor-pointer ${
            page <= 1 ? "opacity-50" : ""
          }`}
          aria-label="Go to the previous page"
        >
          {loading && page > 1 ? <Spinner /> : "Previous page"}
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          onClick={() => handleClick(next)}
          disabled={page >= totalPages || loading}
          className={`px-3 py-1 border rounded bg-gray-800 text-white hover:bg-gray-600 hover:text-white transition-colors cursor-pointer ${
            page >= totalPages ? "opacity-50" : ""
          }`}
          aria-label="Go to the next page"
        >
          {loading && page < totalPages ? <Spinner /> : "Next page"}
        </Button>
      </div>
    );
  }
}
