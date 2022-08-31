import styles from "../../Game.module.css";

export default function Square({ id, value, color, cursor, onClick }) {
  return (
    <div
      key={id}
      className={`${styles.square} ${styles[color]} ${cursor}`}
      onClick={onClick}
    >
      {value !== null ? value.icon : null}
    </div>
  );
}
