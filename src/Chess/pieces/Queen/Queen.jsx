import { white } from "../../constants/players";
import { whiteQueen, blackQueen } from "../../constants/asciis";
import styles from "../../Game.module.css";

export default class Queen {
  constructor(player) {
    this.player = player;
    this.highlight = false;
    this.possible = false;
    this.icon = (
      <span className={styles.piece}>
        {player === white
          ? String.fromCharCode(9813)
          : String.fromCharCode(9819)}
      </span>
    );
    this.ascii = player === white ? whiteQueen : blackQueen;
  }

  canMove(start, end) {
    const startRow = 8 - Math.floor(start / 8);
    const startCol = (start % 8) + 1;
    const endRow = 8 - Math.floor(end / 8);
    const endCol = (end % 8) + 1;

    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    const haveDiagonalMove = rowDiff === colDiff || rowDiff === -colDiff;
    const haveVerticalMove = rowDiff * colDiff === 0 && rowDiff + colDiff !== 0;

    return haveDiagonalMove || haveVerticalMove;
  }
}
