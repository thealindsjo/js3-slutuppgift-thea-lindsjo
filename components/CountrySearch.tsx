"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  query: string;
  onChange: (q: string) => void;
}

export default function CountrySearch({ query, onChange }: Props) {
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
    </div>
  );
}