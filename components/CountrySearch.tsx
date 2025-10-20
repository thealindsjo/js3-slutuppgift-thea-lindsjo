
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  query: string;
  onChange: (q: string) => void;
  region: string;
  onRegionChange: (r: string) => void;
}

export default function CountrySearch({ query, onChange, region, onRegionChange }: Props) {
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Sök land..."
        />
        <Button onClick={() => onChange("")}>Rensa</Button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {regions.map((r) => {
          const selected = region === r;
          return (
            <Button
              key={r}
              onClick={() => onRegionChange(r)}
              className={`text-sm px-3 py-1 rounded ${
                selected ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {r}
            </Button>
          );
        })}
      </div>
    </div>
  );
}