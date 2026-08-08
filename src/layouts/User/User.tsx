import { useAuth } from "@/features/auth/context";
import styles from "./User.module.css";
import { Message } from "@/shared";
import { useNavigate } from "react-router-dom";

export function User() {
  const { user, logout } = useAuth();
  const navigation = useNavigate();

  function handleClick() {
    logout();
    navigation("/");
  }

  if (!user) {
    return <Message message="No user authenticated" />;
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
