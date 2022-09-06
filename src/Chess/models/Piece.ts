export interface IPiece {
  ascii: string;
  highlight: boolean;
  icon: string;
  player: string;
  possible: boolean;
  inCheck?: boolean;
  checked?: 1 | 2;
}
