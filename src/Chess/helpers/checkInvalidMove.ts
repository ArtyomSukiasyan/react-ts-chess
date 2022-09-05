import {
  blackBishop,
  blackKing,
  blackPawn,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKing,
  whitePawn,
  whiteQueen,
  whiteRook,
} from "../constants/asciis";
import blockersExist from "./blockerExist";
import canEnpassant from "./canEnpassant";
import castlingAllowed from "./castlingAllowed";

export default function checkInvalidMove(
  start: number,
  end: any,
  squares: any,
  passantPosition: number,
  whiteKingHasMoved: boolean,
  blackKingHasMoved: boolean,
  rightWhiteRookHasMoved: boolean,
  leftWhiteRookHasMoved: boolean,
  rightBlackRookHasMoved: boolean,
  leftBlackRookHasMoved: boolean,
  passantPos?: number
) {
  const copySquares = squares.slice();
  let bqrpk =
    copySquares[start].ascii === whiteRook ||
    copySquares[start].ascii === blackRook ||
    copySquares[start].ascii === whiteQueen ||
    copySquares[start].ascii === blackQueen ||
    copySquares[start].ascii === whiteBishop ||
    copySquares[start].ascii === blackBishop ||
    copySquares[start].ascii === whitePawn ||
    copySquares[start].ascii === blackPawn ||
    copySquares[start].ascii === whiteKing ||
    copySquares[start].ascii === blackKing;
  let invalid = bqrpk && blockersExist(start, end, copySquares);

  if (invalid) {
    return invalid;
  }

  let pawn =
    copySquares[start].ascii === whitePawn ||
    copySquares[start].ascii === blackPawn;
  invalid =
    pawn && !canEnpassant(start, end, copySquares, passantPosition, passantPos);

  if (invalid) {
    return invalid;
  }

  let king = copySquares[start].ascii.toLowerCase() === whiteKing;

  if (king && Math.abs(end - start) === 2) {
    invalid = !castlingAllowed(
      start,
      end,
      copySquares,
      whiteKingHasMoved,
      blackKingHasMoved,
      rightWhiteRookHasMoved,
      leftWhiteRookHasMoved,
      rightBlackRookHasMoved,
      leftBlackRookHasMoved
    );
  }

  return invalid;
}
