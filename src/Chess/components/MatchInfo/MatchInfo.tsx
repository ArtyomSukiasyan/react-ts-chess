import { ReactElement } from "react";
import { IMatchInfo } from "../../models/Matchinfo";
import styles from "../../Game.module.css";

export default function MatchInfo({
  backAtw,
  back,
  reset,
  next,
  nextAtw,
}: IMatchInfo): ReactElement {
  return (
    <div className={styles.side_box}>
      <div className={styles.button_wrapper}>
        <button className={styles.button} onClick={backAtw}>
          <p>&lt;&lt;</p>
        </button>
        <button className={styles.button} onClick={back}>
          <p>&lt;</p>
        </button>
        <button className={styles.button} onClick={reset}>
          <p>Restart</p>
        </button>
        <button className={styles.button} onClick={next}>
          <p>&gt;</p>
        </button>
        <button className={styles.button} onClick={nextAtw}>
          <p>&gt;&gt;</p>
        </button>
      </div>
    </div>
  );
}
