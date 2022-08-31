import { white } from "../constants/players";
import { whiteKing, blackKing } from "../constants/asciis";

export default function highlightMate(
  player,
  squares,
  checkMated,
  staleMated
) {
  const copySquares = squares.slice();
  if (checkMated || staleMated) {
    for (let i = 0; i < 64; i++) {
      if (copySquares[i].ascii === (player === white ? whiteKing : blackKing)) {
        copySquares[i].checked = checkMated === true ? 1 : 2;
        break;
      }
    }
  }
  return copySquares;
}
