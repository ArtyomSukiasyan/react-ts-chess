import styles from "../Game.module.css";

export default function Notation(props) {
  return <button className={styles.label}> {props.value} </button>;
}
