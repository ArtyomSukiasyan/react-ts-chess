import { MouseEventHandler } from "react";

export interface ISquare {
  value: {
    ascii: string;
    highlight: boolean;
    icon: string;
    player: string;
    possible: boolean;
  };
  color: string;
  cursor: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}
