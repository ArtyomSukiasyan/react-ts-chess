import { IPiece } from "../models/Piece";

export default function clearPossibleHighlight(squares: IPiece[]): IPiece[] {
  const copySquares = squares.slice();

  for (let i = 0; i < 64; i++) {
    if (copySquares[i].possible) {
      copySquares[i].possible = false;
    }
  }

  return copySquares;
}
