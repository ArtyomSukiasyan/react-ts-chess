import { ReactElement } from "react";
import styles from "../Game.module.css";

export default function Notation({
  value,
}: {
  [key: string]: string | number;
}): ReactElement {
  return <button className={styles.label}> {value} </button>;
}
