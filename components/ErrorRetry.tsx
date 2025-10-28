"use client";
import React from "react";
export default function ErrorRetry({ message }: { message?: string }) {
  return (
    <div className="p-4 border rounded-lg bg-red-50">
      <p className="text-red-600">{message ?? "Something went wrong."}</p>
      <div className="mt-3 space-x-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
        <a href="/countries" className="px-3 py-1 border rounded">
          Back to list
        </a>
      </div>
    </div>
  );
}
