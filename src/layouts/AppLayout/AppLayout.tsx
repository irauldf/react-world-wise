import { CityMap } from "@/features/cities/components";
import { Sidebar } from "../Sidebar";
import styles from "./AppLayout.module.css";
import { User } from "../User";

export function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <CityMap />
      <User />
    </div>
  );
}
