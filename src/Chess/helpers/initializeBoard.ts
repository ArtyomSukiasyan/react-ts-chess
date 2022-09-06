import Piece from "../pieces/FillerPiece/FillerPiece";
import King from "../pieces/King/King";
import Queen from "../pieces/Queen/Queen";
import Rook from "../pieces/Rook/Rook";
import Bishop from "../pieces/Bishop/Bishop";
import Knight from "../pieces/Knight/Knight";
import Pawn from "../pieces/Pawn/Pawn";
import { white, black } from "../constants/players";
import { IPiece } from "../models/Piece";

export default function initializeBoard(): IPiece[] {
  const squares = Array(64).fill(null);

  for (let i = 8; i < 16; i++) {
    squares[i] = new Pawn(black);
  }

  for (let i = 8 * 6; i < 8 * 6 + 8; i++) {
    squares[i] = new Pawn(white);
  }

  squares[1] = new Knight(black);
  squares[6] = new Knight(black);

  squares[57] = new Knight(white);
  squares[62] = new Knight(white);

  squares[2] = new Bishop(black);
  squares[5] = new Bishop(black);

  squares[58] = new Bishop(white);
  squares[61] = new Bishop(white);

  squares[0] = new Rook(black);
  squares[7] = new Rook(black);

  squares[56] = new Rook(white);
  squares[63] = new Rook(white);

  squares[3] = new Queen(black);
  squares[4] = new King(black);

  squares[59] = new Queen(white);
  squares[60] = new King(white);

  for (let i = 0; i < 64; i++) {
    if (squares[i] === null) {
      squares[i] = new Piece(null);
    }
  }

  return squares;
}
