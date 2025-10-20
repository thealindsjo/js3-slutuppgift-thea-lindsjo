import Image from "next/image";
import Link from "next/link";

export default function CountryCard({ country }: { country: any }) {
  return (
    <li className="border rounded-lg p-4">
      <Link href={`/info/${country.cca3}`} className="block">
        <div className="mb-2 w-16 h-10 relative">
          <Image
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width={64}
            height={40}
            className="object-contain"
          />
        </div>

        <h2 className="font-semibold">{country.name.common}</h2>
        <p>Region: {country.region}</p>
        {country.capital && <p>Capital: {country.capital[0]}</p>}
      </Link>
    </li>
  );
}