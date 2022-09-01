export default function clearHighlight(squares: any[]): any[] {
  const copySquares = squares.slice();

  for (let j = 0; j < 64; j++) {
    if (copySquares[j].highlight) {
      copySquares[j].highlight = false;
    }
  }
  
  return copySquares;
}
