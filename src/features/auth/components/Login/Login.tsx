import { PageNav } from "@/shared";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Button, Message } from "@/shared/components";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("rdelgado@gmail.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isLoggingIn, isAuthenticated, errorMessage } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form
        className={`${styles.form} ${isLoggingIn ? styles.loading : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button variant="primary" type="submit">
            {isLoggingIn ? "Loading..." : "Login"}
          </Button>
        </div>
        {errorMessage && (
          <div>
            <Message message={errorMessage} />
          </div>
        )}
      </form>
    </main>
  );
}
