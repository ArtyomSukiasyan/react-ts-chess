import { whiteKing } from "../constants/asciis";
import { blackKing } from "../constants/asciis";
import {
  blackSquare,
  highlightedSquare,
  inCheckSquare,
  selectedSquare,
  whiteSquare,
} from "../constants/squares";

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
      ? whiteSquare
      : blackSquare;

  if (squares[i * 8 + j].highlight) {
    squareColor = selectedSquare;
  }

  if (squares[i * 8 + j].possible) {
    squareColor = highlightedSquare;
  }

  if (squares[i * 8 + j].ascii !== null && isKing) {
    if (squares[i * 8 + j].inCheck) {
      squareColor = inCheckSquare;
    }
  }

  function isEven(value: number): number {
    return value % 2;
  }

  return squareColor;
}
