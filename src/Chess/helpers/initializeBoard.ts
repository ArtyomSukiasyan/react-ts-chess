import Piece from "../pieces/FillerPiece/FillerPiece";
import King from "../pieces/King/King";
import Queen from "../pieces/Queen/Queen";
import Rook from "../pieces/Rook/Rook";
import Bishop from "../pieces/Bishop/Bishop";
import Knight from "../pieces/Knight/Knight";
import Pawn from "../pieces/Pawn/Pawn";
import { white, black } from "../constants/players";

export default function initializeBoard(): any[] {
  const squares = Array(64).fill(null);

  for (let i = 8; i < 16; i++) {
    squares[i] = new Pawn(black);
  }

  for (let i = 8 * 6; i < 8 * 6 + 8; i++) {
    squares[i] = new Pawn(white);
  }

  squares[1] = new Knight(black);
  squares[6] = new Knight(black);

  squares[56 + 1] = new Knight(white);
  squares[56 + 6] = new Knight(white);

  squares[2] = new Bishop(black);
  squares[5] = new Bishop(black);

  squares[56 + 2] = new Bishop(white);
  squares[56 + 5] = new Bishop(white);

  squares[0] = new Rook(black);
  squares[7] = new Rook(black);

  squares[56 + 0] = new Rook(white);
  squares[56 + 7] = new Rook(white);

  squares[3] = new Queen(black);
  squares[4] = new King(black);

  squares[56 + 3] = new Queen(white);
  squares[56 + 4] = new King(white);

  for (let i = 0; i < 64; i++) {
    if (squares[i] === null) {
      squares[i] = new Piece(null);
    }
  }

  return squares;
}
