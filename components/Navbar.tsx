"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold" aria-label="Gå till startsidan">
              CountriesApp
            </Link>

            <Link href="/countries" className="px-2 py-1 text-sm hover:underline">
              Länder
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}