import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Logo } from "@/shared/components";
import { AppNav } from "../AppNav";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
