/**
 * CountrySearch Component
 *
 * Provides search input and region filter functionality for the countries list.
 * Includes real-time search, region selection buttons, and clear functionality.
 * Features hover effects and loading states for better user experience.
 */

"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";

interface Props {
  query: string;
  onChange: (q: string) => void;
  region: string;
  onRegionChange: (r: string) => void;
}

export default function CountrySearch({
  query,
  onChange,
  region,
  onRegionChange,
}: Props) {
  const [isClearing, setIsClearing] = useState(false);
  const regions = [
    "All",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Antarctic",
  ];

  const handleClear = () => {
    setIsClearing(true);
    onChange("");
    setTimeout(() => setIsClearing(false), 250);
  };

  return (
    <div className="mb-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search country..."
            maxLength={100}
            aria-label="Search country"
            autoComplete="off"
          />
          <Button
            onClick={handleClear}
            aria-label="Clear search"
            disabled={isClearing}
            className="bg-gray-800 text-white hover:bg-gray-600 hover:text-white transition-colors cursor-pointer"
          >
            {isClearing ? <Spinner /> : "Clear"}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {regions.map((r) => {
            const selected = region === r;
            return (
              <Button
                key={r}
                onClick={() => onRegionChange(r)}
                className={`text-sm px-3 py-1 rounded transition-colors cursor-pointer ${
                  selected
                    ? "bg-sky-600 text-white hover:bg-sky-700 hover:text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800"
                }`}
                aria-label={r}
                role="tab"
              >
                {r}
              </Button>
            );
          })}
        </div>
      </form>
    </div>
  );
}
