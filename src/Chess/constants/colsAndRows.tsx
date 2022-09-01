import Notation from "../helpers/notation";

export const rowNums: any = [];
for (let i = 8; i > 0; i--) {
  rowNums.push(<Notation key={i} value={i} />);
}

export const colNums: any = [];
for (let i = 1; i < 9; i++) {
  let letter;

  switch (i) {
    case 1:
      letter = "A";
      break;
    case 2:
      letter = "B";
      break;
    case 3:
      letter = "C";
      break;
    case 4:
      letter = "D";
      break;
    case 5:
      letter = "E";
      break;
    case 6:
      letter = "F";
      break;
    case 7:
      letter = "G";
      break;
    case 8:
      letter = "H";
      break;
    default:
      break;
  }

  colNums.push(<Notation key={letter} value={letter} />);
}
