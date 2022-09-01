export default function blockersExist(
  start: number,
  end: number,
  squares: any[]
): boolean {
  let startRow = 8 - Math.floor(start / 8);
  let startCol = (start % 8) + 1;
  let endRow = 8 - Math.floor(end / 8);
  let endCol = (end % 8) + 1;
  let rowDiff = endRow - startRow;
  let colDiff = endCol - startCol;
  let rowCtr = 0;
  let colCtr = 0;
  const copySquares = squares.slice();

  while (colCtr !== colDiff || rowCtr !== rowDiff) {
    let position = 64 - startRow * 8 + -8 * rowCtr + (startCol - 1 + colCtr);

    if (
      copySquares[position].ascii != null &&
      copySquares[position] !== copySquares[start]
    ) {
      return true;
    }

    if (colCtr !== colDiff) {
      if (colDiff > 0) {
        ++colCtr;
      } else {
        --colCtr;
      }
    }
    
    if (rowCtr !== rowDiff) {
      if (rowDiff > 0) {
        ++rowCtr;
      } else {
        --rowCtr;
      }
    }
  }

  return false;
}
