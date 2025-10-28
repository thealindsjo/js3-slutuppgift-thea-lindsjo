import Image from "next/image";
import Link from "next/link";
import { Country } from "@/types/country";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <li className="border rounded-lg p-4 hover:shadow transition-shadow bg-white">
      <Link href={`/country/${country.cca3}`} className="block">
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
      </Link>
    </li>
  );
}
