import { Message, Spinner } from "@/shared";
import { CountryList } from "../components/CountryList";
import { getCountries } from "../utils";
import { useCities } from "@/features/cities/context";

export function CountryPage() {
  const { isLoadingCities: isLoading, cities, errorMessage } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  const countries = getCountries(cities);

  return (
    <div>
      {errorMessage ? (
        <Message message={errorMessage} />
      ) : (
        <CountryList countries={countries} />
      )}
    </div>
  );
}
