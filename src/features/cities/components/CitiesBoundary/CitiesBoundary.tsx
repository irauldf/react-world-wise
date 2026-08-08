import { Message, Spinner } from "@/shared";
import { useCities } from "../../context";
import type { PropsWithChildren } from "react";

export function CitiesBoundary({ children }: PropsWithChildren) {
  const { isLoadingCities, errorMessage } = useCities();

  if (isLoadingCities) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <Message message={errorMessage} />;
  }

  return children;
}
