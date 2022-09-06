import {
  blackKing,
  blackPawn,
  whiteKing,
  whitePawn,
} from "../constants/asciis";
import { black, white } from "../constants/players";
import { IPiece } from "../models/Piece";
import Bishop from "../pieces/Bishop/Bishop";
import FillerPiece from "../pieces/FillerPiece/FillerPiece";
import Knight from "../pieces/Knight/Knight";
import Queen from "../pieces/Queen/Queen";
import Rook from "../pieces/Rook/Rook";

export default function makeMove(
  squares: IPiece[],
  start: number,
  end: number,
  passantPosition: number,
  passantPos?: number
): IPiece[] {
  const copySquares = squares.slice();
  const isWhiteKing = copySquares[start].ascii === whiteKing;
  const isBlackKing = copySquares[start].ascii === blackKing;
  const isKing = isWhiteKing || isBlackKing;

  if (isKing && Math.abs(end - start) === 2) {
    if (end === (copySquares[start].ascii === whiteKing ? 62 : 6)) {
      copySquares[end - 1] = copySquares[end + 1];
      copySquares[end - 1].highlight = true;
      copySquares[end + 1] = new FillerPiece(null);
      copySquares[end + 1].highlight = true;
    } else if (end === (copySquares[start].ascii === whiteKing ? 58 : 2)) {
      copySquares[end + 1] = copySquares[end - 2];
      copySquares[end + 1].highlight = true;
      copySquares[end - 2] = new FillerPiece(null);
      copySquares[end - 2].highlight = true;
    }
  }

  let passant = passantPos == null ? passantPosition : passantPos;

  if (
    copySquares[start].ascii === whitePawn ||
    copySquares[start].ascii === blackPawn
  ) {
    if (end - start === -7 || end - start === 9) {
      if (start + 1 === passant) {
        copySquares[start + 1] = new FillerPiece(null);
      }
    } else if (end - start === -9 || end - start === 7) {
      if (start - 1 === passant) copySquares[start - 1] = new FillerPiece(null);
    }
  }

  copySquares[end] = copySquares[start];
  copySquares[end].highlight = true;
  copySquares[start] = new FillerPiece(null);
  copySquares[start].highlight = true;

  if (copySquares[end].ascii === whitePawn && end >= 0 && end <= 7) {
    const figure = prompt(
      "please, select 'queen', 'rook', 'bishop' or 'knight'"
    );
    if (figure === "queen") {
      copySquares[end] = new Queen(white);
    } else if (figure === "rook") {
      copySquares[end] = new Rook(white);
    } else if (figure === "bishop") {
      copySquares[end] = new Bishop(white);
    } else if (figure === "knight") {
      copySquares[end] = new Knight(white);
    }

    copySquares[end].highlight = true;
  }

  if (copySquares[end].ascii === blackPawn && end >= 56 && end <= 63) {
    const figure = prompt(
      "please, select 'queen', 'rook', 'bishop' or 'knight'"
    );

    if (figure === "queen") {
      copySquares[end] = new Queen(black);
    } else if (figure === "rook") {
      copySquares[end] = new Rook(black);
    } else if (figure === "bishop") {
      copySquares[end] = new Bishop(black);
    } else if (figure === "knight") {
      copySquares[end] = new Knight(black);
    }

    copySquares[end].highlight = true;
  }

  return copySquares;
}
