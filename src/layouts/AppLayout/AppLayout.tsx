import { Sidebar } from "../Sidebar";
import styles from "./AppLayout.module.css";
import { User } from "../User";
import { lazy } from "react";

const CityMap = lazy(() =>
  import("@/features/cities/components/CityMap/CityMap").then((m) => ({ default: m.CityMap })),
);

export function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <CityMap />
      <User />
    </div>
  );
}
