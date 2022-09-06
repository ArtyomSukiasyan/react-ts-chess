import { blackRook, whiteRook } from "../constants/asciis";
import { white } from "../constants/players";
import { ICastlingConditions } from "../models/CastlingConditions";
import { IPiece } from "../models/Piece";

export default function castlingAllowed(
  startPosition: number,
  endPosition: number,
  squares: IPiece[],
  castlingConditions: ICastlingConditions
): boolean {
  let player = squares[startPosition].player;
  const kingDefaultPosition = player === white ? 60 : 4;

  if (startPosition !== kingDefaultPosition) {
    return false;
  }

  const deltaPos = endPosition - startPosition;
  const rookASCII = player === white ? whiteRook : blackRook;
  const kingASCII =
    deltaPos === 2
      ? squares[endPosition + 1].ascii
      : squares[endPosition - 2].ascii;

  if (kingASCII !== rookASCII) {
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
  } else {
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
