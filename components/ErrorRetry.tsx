"use client";
import React from "react";

export default function ErrorRetry({ message }: { message?: string }) {
  return (
    <div className="p-4 border rounded">
      <p className="text-red-600">{message ?? "Något gick fel."}</p>
      <div className="mt-3">
        <button className="px-3 py-1 bg-sky-600 text-white rounded mr-2" onClick={() => location.reload()}>
          Försök igen
        </button>
        <a href="/countries" className="px-3 py-1 border rounded">Tillbaka till listan</a>
      </div>
    </div>
  );
}