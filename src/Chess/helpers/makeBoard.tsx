import calcSquareColor from "./calcSquareColor";
import Square from "../components/Squares/Squares";

import styles from "../Game.module.css";

export default function MakeBoard(
  isWhite: boolean,
  squares: any,
  turn: any,
  mated: boolean,
  historyNum: any,
  turnNum: any,
  handleClick: any
) {
  const board = [];

  if (isWhite) {
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const copySquares = squares.slice();
        let squareColor = calcSquareColor(i, j, copySquares);
        let squareCursor = styles.pointer;
        if (copySquares[i * 8 + j].player !== turn) {
          squareCursor = styles.default;
        }

        if (mated) {
          squareCursor = styles.default;
        }

        if (historyNum - 1 !== turnNum) {
          squareCursor = styles.not_allowed;
        }

        squareRows.push(
          <Square
            value={copySquares[i * 8 + j]}
            color={squareColor}
            cursor={squareCursor}
            onClick={() => handleClick(i * 8 + j)}
            key={i * 8 + j}
          />
        );
      }
      board.push(<div key={i + 64}>{squareRows}</div>);
    }
  } else {
    for (let i = 7; i >= 0; i--) {
      const squareRows = [];
      for (let j = 7; j >= 0; j--) {
        const copySquares = squares.slice();
        let squareColor = calcSquareColor(i, j, copySquares);
        let squareCursor = styles.pointer;
        if (copySquares[i * 8 + j].player !== turn) {
          squareCursor = styles.default;
        }

        if (mated) {
          squareCursor = styles.default;
        }

        if (historyNum - 1 !== turnNum) {
          squareCursor = styles.not_allowed;
        }

        squareRows.push(
          <Square
            value={copySquares[i * 8 + j]}
            color={squareColor}
            cursor={squareCursor}
            onClick={() => handleClick(i * 8 + j)}
            key={i * 8 + j}
          />
        );
      }
      board.push(<div key={i + 64}>{squareRows}</div>);
    }
  }

  return board;
}
