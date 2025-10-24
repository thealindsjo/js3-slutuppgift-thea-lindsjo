"use client";
import React from "react";
import { Button } from "./ui/button";

export default function ErrorRetry({ message }: { message?: string }) {
  return (
    <div className="p-4 border rounded">
      <p className="text-red-600">{message ?? "Något gick fel."}</p>
      <div className="mt-3">
        <Button className="px-3 py-1 bg-sky-600 text-white rounded mr-2" onClick={() => location.reload()}>
          Försök igen
        </Button>
        <a href="/countries" className="px-3 py-1 border rounded">Tillbaka till listan</a>
      </div>
    </div>
  );
}