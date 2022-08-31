import { white } from "../../constants/players";
import { whiteKing, blackKing } from "../../constants/asciis";
import styles from "../../Game.module.css";

export default class King {
  constructor(player) {
    this.player = player;
    this.highlight = false;
    this.possible = false;
    this.checked = false;
    this.inCheck = false;
    this.icon = (
      <span className={styles.piece}>
        {player === white
          ? String.fromCharCode(9812)
          : String.fromCharCode(9818)}
      </span>
    );
    this.ascii = player === white ? whiteKing : blackKing;
  }

  canMove(start, end) {
    const startRow = 8 - Math.floor(start / 8);
    const startCol = (start % 8) + 1;
    const endRow = 8 - Math.floor(end / 8);
    const endCol = (end % 8) + 1;

    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    const topLeft = rowDiff === 1 && colDiff === -1;
    const top = rowDiff === 1 && colDiff === 0;
    const topRight = rowDiff === 1 && colDiff === 1;
    const downLeft = rowDiff === -1 && colDiff === -1;
    const down = rowDiff === -1 && colDiff === 0;
    const downRight = rowDiff === -1 && colDiff === 1;
    const dubleLeft = rowDiff === 0 && colDiff === -2;
    const left = rowDiff === 0 && colDiff === -1;
    const fixed = rowDiff === 0 && colDiff === 0;
    const right = rowDiff === 0 && colDiff === 1;
    const dubleRight = rowDiff === 0 && colDiff === 2;

    return (
      topLeft ||
      top ||
      topRight ||
      downLeft ||
      down ||
      downRight ||
      left ||
      dubleLeft ||
      fixed ||
      right ||
      dubleRight
    );
  }
}
