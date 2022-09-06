import { IPiece } from "../models/Piece";

export default function clearHighlight(squares: IPiece[]): IPiece[] {
  const copySquares = squares.slice();

  for (let j = 0; j < 64; j++) {
    if (copySquares[j].highlight) {
      copySquares[j].highlight = false;
    }
  }
  
  return copySquares;
}
