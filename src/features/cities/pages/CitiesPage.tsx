import { CityList } from "../components";
import { CitiesBoundary } from "../components/CitiesBoundary";
import { useCities } from "../context";

export function CitiesPage() {
  const { cities } = useCities();

  return (
    <CitiesBoundary>
      <CityList cities={cities} />
    </CitiesBoundary>
  );
}
