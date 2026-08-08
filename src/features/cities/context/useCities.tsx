import { useContext } from "react";
import { CitiesContext } from ".";

export function useCities() {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }

  return context;
}