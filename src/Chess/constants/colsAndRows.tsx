import { ReactElement } from "react";
import Notation from "../helpers/notation";

export const rowNums: ReactElement[] = [];
for (let i = 8; i > 0; i--) {
  rowNums.push(<Notation key={i} value={i} />);
}

export const colNums: ReactElement[] = [];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

for (let i = 0; i < letters.length; i++) {
  colNums.push(<Notation key={letters[i]} value={letters[i]} />);
}
