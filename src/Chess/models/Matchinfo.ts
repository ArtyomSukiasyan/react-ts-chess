import { MouseEventHandler } from "react";

export interface IMatchInfo {
  [key: string]: MouseEventHandler<HTMLButtonElement>;
}
