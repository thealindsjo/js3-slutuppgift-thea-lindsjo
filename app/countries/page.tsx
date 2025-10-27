import { fetchCountries } from "@/api/fetchCountries";
import CountriesContainer from "@/components/CountriesContainer";
import LoginAlert from "@/components/LoginAlert";
import { Suspense } from "react";

export default async function CountriesPage() {
  const allCountries = await fetchCountries();

  return (
    <>
    <Suspense fallback={null}>
        <LoginAlert />
      </Suspense>

    <CountriesContainer initialCountries={allCountries} />
    </>
  )
}
