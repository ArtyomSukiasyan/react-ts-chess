import { blackRook, whiteRook } from "../constants/asciis";
import { black, white } from "../constants/players";

export default function castlingAllowed(
  start: number,
  end: number,
  squares: any[],
  castlingConditions: any
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

  if (
    (player === white
      ? castlingConditions.whiteKingHasMoved
      : castlingConditions.blackKingHasMoved) !== false
  ) {
    return false;
  }

  if (player === white) {
    if (
      (deltaPos === 2
        ? castlingConditions.rightWhiteRookHasMoved
        : castlingConditions.leftWhiteRookHasMoved) !== false
    ) {
      return false;
    }
  } else if (player === black) {
    if (
      (deltaPos === 2
        ? castlingConditions.rightBlackRookHasMoved
        : castlingConditions.leftBlackRookHasMoved) !== false
    ) {
      return false;
    }
  }

  return true;
}
