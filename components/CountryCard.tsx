/**
 * CountryCard Component
 *
 * Displays a single country in a card format with flag, name, region, and capital.
 * Clickable card that checks authentication before navigating to country details.
 * Shows login alert if user is not authenticated.
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Country } from "@/types/country";

export default function CountryCard({ country }: { country: Country }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      // User is logged in, navigate to country page
      router.push(`/country/${country.cca3}`);
    } else {
      // User is not logged in, redirect to countries page with login alert
      router.push(
        `/countries?loginRequired=true&attempted=/country/${country.cca3}`
      );
    }
  };

  return (
    <li className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white cursor-pointer">
      <div onClick={handleClick} className="block">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-full sm:w-20 h-12 shrink-0 relative">
            <Image
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              width={64}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-lg">{country.name.common}</h2>
            {country.name?.official && (
              <div className="text-sm text-gray-600 hidden sm:block">
                {country.name.official}
              </div>
            )}
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-medium">Region:</span> {country.region}
            </p>
            {country.capital && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">Capital:</span>{" "}
                {country.capital[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
