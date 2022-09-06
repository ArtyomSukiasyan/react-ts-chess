import { IPiece } from "../models/Piece";

export default function checkStaleMate(
  player: string,
  squares: IPiece[],
  isCheck: Function,
  isMoveAvailable: Function
) {
  if (isCheck(player, squares)) {
    return false;
  }

  for (let i = 0; i < 64; i++) {
    if (squares[i].player === player) {
      for (let j = 0; j < 64; j++) {
        if (isMoveAvailable(i, j, squares)) {
          return false;
        }
      }
    }
  }

  return true;
}
