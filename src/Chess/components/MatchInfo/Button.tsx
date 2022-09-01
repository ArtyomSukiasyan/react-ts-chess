import { IButton } from "../../models/Button";
import styles from "../../Game.module.css";

export default function Button({ text, onClick }: IButton) {
  return (
    <button className={styles.button} onClick={onClick}>
      <p>{text}</p>
    </button>
  );
}
