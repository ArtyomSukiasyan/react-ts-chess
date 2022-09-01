import { blackPawn, whitePawn } from "../constants/asciis";
import { black, white } from "../constants/players";

export default function canEnpassant(start: number, end: number, squares: any[], statePassantPos: number, passantPos: number): boolean {
    let passant = passantPos === undefined ? statePassantPos : passantPos;
    let startRow = 8 - Math.floor(start / 8);
    let startCol = (start % 8) + 1;
    let endRow = 8 - Math.floor(end / 8);
    let endCol = (end % 8) + 1;
    let rowDiff = endRow - startRow;
    let colDiff = endCol - startCol;
    const copySquares = squares.slice();

    if (rowDiff === 2 || rowDiff === -2) {
      if (copySquares[start].player === white && (start < 48 || start > 55))
        return false;
      if (copySquares[start].player === black && (start < 8 || start > 15))
        return false;
    }

    if (copySquares[end].ascii !== null) {
      if (colDiff === 0) return false;
    }
    
    if (rowDiff === 1 && colDiff === 1) {
      if (copySquares[end].ascii === null) {
        if (copySquares[start + 1].ascii !== blackPawn || passant !== start + 1)
          return false;
      }
    } else if (rowDiff === 1 && colDiff === -1) {
      if (copySquares[end].ascii === null) {
        if (copySquares[start - 1].ascii !== blackPawn || passant !== start - 1)
          return false;
      }
    } else if (rowDiff === -1 && colDiff === 1) {
      if (copySquares[end].ascii === null) {
        if (copySquares[start + 1].ascii !== whitePawn || passant !== start + 1)
          return false;
      }
    } else if (rowDiff === -1 && colDiff === -1) {
      if (copySquares[end].ascii === null) {
        if (copySquares[start - 1].ascii !== whitePawn || passant !== start - 1)
          return false;
      }
    }

    return true;
  }