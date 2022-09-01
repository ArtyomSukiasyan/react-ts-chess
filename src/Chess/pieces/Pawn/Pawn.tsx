import { white } from "../../constants/players";
import { whitePawn, blackPawn } from "../../constants/asciis";
import styles from "../../Game.module.css";

export default class Pawn {
  player: any;
  highlight: boolean;
  possible: boolean;
  icon: any;
  ascii: any;

  constructor(player: string) {
    this.player = player;
    this.highlight = false;
    this.possible = false;
    this.icon = (
      <span className={styles.piece}>
        {player === white
          ? String.fromCharCode(9817)
          : String.fromCharCode(9823)}
      </span>
    );
    this.ascii = player === white ? whitePawn : blackPawn;
  }

  canMove(start: number, end: number): boolean {
    const startRow = 8 - Math.floor(start / 8);
    const startCol = (start % 8) + 1;
    const endRow = 8 - Math.floor(end / 8);
    const endCol = (end % 8) + 1;

    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    if (this.player === white) {
      if (colDiff === 0) {
        return rowDiff === 1 || rowDiff === 2;
      } else if (colDiff === -1 || colDiff === 1) {
        return rowDiff === 1;
      }
    } else {
      if (colDiff === 0) {
        return rowDiff === -2 || rowDiff === -1;
      } else if (colDiff === -1 || colDiff === 1) {
        return rowDiff === -1;
      }
    }

    return false;
  }
}
