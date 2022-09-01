import { whiteKing } from "../constants/asciis";
import { blackKing } from "../constants/asciis";

export default function calcSquareColor(
  i: number,
  j: number,
  squares: any[]
): string {
  const isKing =
    squares[i * 8 + j].ascii === whiteKing ||
    squares[i * 8 + j].ascii === blackKing;

  let squareColor =
    (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
      ? "white_square"
      : "black_square";

  if (squares[i * 8 + j].highlight) {
    squareColor = "selected_square";
  }

  if (squares[i * 8 + j].possible) {
    squareColor = "highlighted_square";
  }

  if (squares[i * 8 + j].ascii !== null && isKing) {
    if (squares[i * 8 + j].inCheck) {
      squareColor = "in_check_square";
    }
  }

  function isEven(value: number): number {
    return value % 2;
  }

  return squareColor;
}
