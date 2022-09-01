import { ReactElement } from "react";
import Button from "./Button";
import {
  backAtwText,
  backText,
  nextAtwText,
  nextText,
  restart,
} from "../../constants/matchInfo";
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
        <Button text={backAtwText} onClick={backAtw} />
        <Button text={backText} onClick={back} />
        <Button text={restart} onClick={reset} />
        <Button text={nextText} onClick={next} />
        <Button text={nextAtwText} onClick={nextAtw} />
      </div>
    </div>
  );
}
