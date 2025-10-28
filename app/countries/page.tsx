import { fetchCountries } from "@/api/fetchCountries";
import CountriesContainer from "@/components/CountriesContainer";
import LoginAlert from "@/components/LoginAlert";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export default async function CountriesPage() {
  const allCountries = await fetchCountries();

  return (
    <>
      <Suspense fallback={<Loading message="Laddar länder..." />}>
        <LoginAlert />
      </Suspense>

      <CountriesContainer initialCountries={allCountries} />
    </>
  );
}
