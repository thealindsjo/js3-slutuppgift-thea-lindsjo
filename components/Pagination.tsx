import Link from "next/link";
import React from "react";

interface Props {
  page: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (p: number) => void;
}

export default function Pagination({ page, totalPages, basePath = "/countries", onPageChange }: Props) {
  const prev = page - 1;
  const next = page + 1;

  if (onPageChange) {
    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => onPageChange(prev)}
          disabled={page <= 1}
          className={`px-3 py-1 border rounded ${page <= 1 ? "opacity-50" : ""}`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(next)}
          disabled={page >= totalPages}
          className={`px-3 py-1 border rounded ${page >= totalPages ? "opacity-50" : ""}`}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <Link
        href={`${basePath}?page=${prev}`}
        className={`px-3 py-1 border rounded ${page <= 1 ? "opacity-50 pointer-events-none" : ""}`}
      >
        Previous
      </Link>

      <span>
        Page {page} of {totalPages}
      </span>

      <Link
        href={`${basePath}?page=${next}`}
        className={`px-3 py-1 border rounded ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
      >
        Next
      </Link>
    </div>
  );
}