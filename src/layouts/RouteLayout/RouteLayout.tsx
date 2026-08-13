import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SpinnerFullPage } from "@/shared/components";

export function RouteLayout() {
  const location = useLocation();

  return (
    <Suspense fallback={<SpinnerFullPage />} key={location.key}>
      <Outlet />
    </Suspense>
  );
}
