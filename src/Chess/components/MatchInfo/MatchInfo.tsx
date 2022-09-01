import { ReactElement } from "react";
import { IMatchInfo } from "../../models/Matchinfo";
import styles from "../../Game.module.css";
import Button from "./Button";

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
        <Button text="&lt;&lt;" onClick={backAtw} />
        <Button text="&lt;" onClick={back} />
        <Button text="Restart" onClick={reset} />
        <Button text="&gt;" onClick={next} />
        <Button text="&gt;&gt;" onClick={nextAtw} />
      </div>
    </div>
  );
}
