import { fetchCountries } from "@/lib/fetchCountries";
import CountriesContainer from "@/components/CountriesContainer";

export default async function CountriesPage() {
  const allCountries = await fetchCountries();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Countries</h1>

      <CountriesContainer initialCountries={allCountries} />
    </main>
  );
}