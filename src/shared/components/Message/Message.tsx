import styles from "./Message.module.css";

interface MessageProps {
    message: string;
}

export function Message(props: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {props.message}
    </p>
  );
}
