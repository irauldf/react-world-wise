import styles from "./SpinnerFullPage.module.css";
import { Spinner } from "../Spinner";

export function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}
