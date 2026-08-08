import { HomePage, LoginPage, PricingPage, ProductPage } from "@/features";
import { ProtectedRoute } from "@/features/auth/components";
import { CitiesProvider } from "@/features/cities/context";
import { CitiesPage, CityFormPage, CityPage } from "@/features/cities/pages";
import { CountryPage } from "@/features/countries/pages/CountryPage";
import { AppLayout } from "@/layouts";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
