import type { City } from "@/features/cities/city.types";
import type { Country } from "../country.types";

export function getCountries(cities: City[]): Country[] {
  return cities.reduce<Country[]>((arr, cur) => {
    if (!arr.some((country) => country.name === cur.country)) {
      const country: Country = {
        emoji: cur.emoji,
        name: cur.country,
      };

      arr.push(country);
    }

    return arr;
  }, []);
}
