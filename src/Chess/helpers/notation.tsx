import React from "react";
import styles from "../Game.module.css";

export default function Notation(props): any {
  return <button className={styles.label}> {props.value} </button>;
}
