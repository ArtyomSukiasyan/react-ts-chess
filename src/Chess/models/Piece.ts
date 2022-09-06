export interface IPiece {
  ascii: string;
  highlight: boolean;
  icon: string;
  player: string;
  possible: boolean;
  inCheck?: boolean
}
