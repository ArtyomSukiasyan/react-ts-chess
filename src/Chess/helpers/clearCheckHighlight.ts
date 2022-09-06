import { white } from "../constants/players";
import { whiteKing, blackKing } from "../constants/asciis";
import { IPiece } from "../models/Piece";

export default function clearCheckHighlight(
  squares: IPiece[],
  player: string
): IPiece[] | void {
  const copySquares = squares.slice();
  const kingColor = player === white ? whiteKing : blackKing;

  for (let j = 0; j < 64; j++) {
    if (copySquares[j].ascii === kingColor) {
      copySquares[j].inCheck = false;
      
      return copySquares;
    }
  }
}
