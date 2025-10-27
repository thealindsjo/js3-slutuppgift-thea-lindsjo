import { fetchCountries } from "@/api/fetchCountries";
import CountriesContainer from "@/components/CountriesContainer";
import SignIn from "@/components/SignIn";

export default async function CountriesPage() {
  const allCountries = await fetchCountries();

  return (
    <>
    <CountriesContainer initialCountries={allCountries} />;
    </>
  )
}
