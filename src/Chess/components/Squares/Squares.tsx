import styles from "../../Game.module.css";
import { ISquare } from "../../models/Square";

export default function Square({
  value,
  color,
  cursor,
  onClick,
}: ISquare): any {
  return (
    <div
      className={`${styles.square} ${styles[color]} ${cursor}`}
      onClick={onClick}
    >
      {value !== null ? value.icon : null}
    </div>
  );
}
