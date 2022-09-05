export default function checkStaleMate(
  player: any,
  squares: any,
  isCheck: any,
  isMoveAvailable: any
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
