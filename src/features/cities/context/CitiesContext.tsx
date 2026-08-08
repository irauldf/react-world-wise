import { createContext } from "react";
import type { CitiesContextType } from "./context.types";

export const CitiesContext = createContext<CitiesContextType | undefined>(
  undefined,
);
