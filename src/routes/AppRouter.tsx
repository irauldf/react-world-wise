import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/components";
import { CitiesProvider } from "@/features/cities/context";
import { lazy, Suspense } from "react";
import { SpinnerFullPage } from "@/shared";
import { RouteLayout } from "@/layouts/RouteLayout";

// import { HomePage, LoginPage, PricingPage, ProductPage } from "@/features";
// import { CitiesPage, CityFormPage, CityPage } from "@/features/cities/pages";
// import { CountryPage } from "@/features/countries/pages/CountryPage";
// import { AppLayout } from "@/layouts";
// import { NotFoundPage } from "@/pages/NotFoundPage";

// dist/assets/index-DDRPZwd6.css   31.38 kB │ gzip:   5.10 kB
// dist/assets/index-CXuWo_r0.js   588.05 kB │ gzip: 172.70 kB

const HomePage = lazy(() =>
  import("@/features/home/pages").then((m) => ({ default: m.HomePage })),
);
const LoginPage = lazy(() =>
  import("@/features/auth/pages").then((m) => ({ default: m.LoginPage })),
);
const PricingPage = lazy(() =>
  import("@/features/pricing/pages").then((m) => ({ default: m.PricingPage })),
);
const ProductPage = lazy(() =>
  import("@/features/product/pages").then((m) => ({ default: m.ProductPage })),
);
const CitiesPage = lazy(() =>
  import("@/features/cities/pages").then((m) => ({ default: m.CitiesPage })),
);
const CityPage = lazy(() =>
  import("@/features/cities/pages").then((m) => ({ default: m.CityPage })),
);
const CityFormPage = lazy(() =>
  import("@/features/cities/pages").then((m) => ({ default: m.CityFormPage })),
);
const AppLayout = lazy(() =>
  import("@/layouts").then((m) => ({ default: m.AppLayout })),
);
const CountryPage = lazy(() =>
  import("@/features/countries/pages").then((m) => ({
    default: m.CountryPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages").then((m) => ({ default: m.NotFoundPage })),
);

export function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route element={<RouteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <CitiesProvider>
                      <AppLayout />
                    </CitiesProvider>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CitiesPage />} />
                <Route path="cities/:id" element={<CityPage />} />
                <Route path="form" element={<CityFormPage />} />
                <Route path="countries" element={<CountryPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
