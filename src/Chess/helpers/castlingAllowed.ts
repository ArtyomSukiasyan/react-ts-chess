import { blackRook, whiteRook } from "../constants/asciis";
import { black, white } from "../constants/players";

export default function castlingAllowed(
  start: number,
  end: number,
  squares: any[],
  whiteKingHasMoved: boolean,
  blackKingHasMoved: boolean,
  rightWhiteRookHasMoved: boolean,
  leftWhiteRookHasMoved: boolean,
  rightBlackRookHasMoved: boolean,
  leftBlackRookHasMoved: boolean
): boolean {
  const copySquares = squares.slice();
  let player = copySquares[start].player;
  let deltaPos = end - start;

  if (start !== (player === white ? 60 : 4)) {
    return false;
  }

  if (
    (deltaPos === 2
      ? copySquares[end + 1].ascii
      : copySquares[end - 2].ascii) !==
    (player === white ? whiteRook : blackRook)
  ) {
    return false;
  }

  if ((player === white ? whiteKingHasMoved : blackKingHasMoved) !== false) {
    return false;
  }

  if (player === white) {
    if (
      (deltaPos === 2 ? rightWhiteRookHasMoved : leftWhiteRookHasMoved) !==
      false
    ) {
      return false;
    }
  } else if (player === black) {
    if (
      (deltaPos === 2 ? rightBlackRookHasMoved : leftBlackRookHasMoved) !==
      false
    ) {
      return false;
    }
  }

  return true;
}
