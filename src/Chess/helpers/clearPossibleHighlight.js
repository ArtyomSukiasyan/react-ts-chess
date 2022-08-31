export default function clearPossibleHighlight(squares) {
  const copySquares = squares.slice();
  for (let i = 0; i < 64; i++) {
    if (copySquares[i].possible){
       copySquares[i].possible = false;
    }
  }
  return copySquares;
}
