import { lazy } from "react";

const CityForm = lazy(() =>
  import("../components/CityForm/CityForm").then((m) => ({
    default: m.CityForm,
  })),
);

export function CityFormPage() {
  return <CityForm />;
}
