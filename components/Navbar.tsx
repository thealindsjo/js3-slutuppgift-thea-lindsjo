"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("demo_logged_in");
    setLoggedIn(v === "1");
  }, []);

  const toggleAuth = () => {
    const next = !loggedIn;
    setLoggedIn(next);
    localStorage.setItem("demo_logged_in", next ? "1" : "0");
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold" aria-label="Gå till startsidan">
              CountriesApp
            </Link>
            
                <Link href="/countries" role="menuitem" className="px-2 py-1 text-sm hover:underline">
                  Länder
                </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600" aria-hidden="true">
              {loggedIn ? "Inloggad" : "Inte inloggad"}
            </span>
            <Button onClick={toggleAuth} aria-label={loggedIn ? "Logga ut" : "Logga in"}>
              {loggedIn ? "Logga ut" : "Logga in"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}