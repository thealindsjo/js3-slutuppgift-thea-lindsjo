/**
 * Countries List Page
 *
 * Main page displaying all countries with search and filter functionality.
 * Fetches countries data server-side and passes to client components.
 * Includes authentication alert and loading states for better UX.
 */

import { fetchCountries } from "@/api/fetchCountries";
import CountriesContainer from "@/components/CountriesContainer";
import LoginAlert from "@/components/LoginAlert";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export default async function CountriesPage() {
  const allCountries = await fetchCountries();

  return (
    <>
      <Suspense fallback={<Loading message="Loading countries..." />}>
        <LoginAlert />
      </Suspense>

      <CountriesContainer initialCountries={allCountries} />
    </>
  );
}
