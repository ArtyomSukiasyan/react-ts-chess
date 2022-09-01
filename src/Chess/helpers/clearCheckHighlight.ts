import { white } from "../constants/players";
import { whiteKing, blackKing } from "../constants/asciis";

export default function clearCheckHighlight(
  squares: any[],
  player: "white" | "black"
): any[] | void {
  const copySquares = squares.slice();
  
  for (let j = 0; j < 64; j++) {
    if (copySquares[j].ascii === (player === white ? whiteKing : blackKing)) {
      copySquares[j].inCheck = false;
      return copySquares;
    }
  }
}
