import { white } from "../../constants/players";
import { whiteRook, blackRook } from "../../constants/asciis";
import styles from "../../Game.module.css";

export default class Rook {
  constructor(player) {
    this.player = player;
    this.highlight = false;
    this.possible = false;
    this.icon = (
      <span className={styles.piece}>
        {player === white
          ? String.fromCharCode(9814)
          : String.fromCharCode(9820)}
      </span>
    );
    this.ascii = player === white ? whiteRook : blackRook;
  }

  canMove(start, end) {
    const startRow = 8 - Math.floor(start / 8);
    const startCol = (start % 8) + 1;
    const endRow = 8 - Math.floor(end / 8);
    const endCol = (end % 8) + 1;

    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    return rowDiff * colDiff === 0 && rowDiff + colDiff !== 0;
  }
}
